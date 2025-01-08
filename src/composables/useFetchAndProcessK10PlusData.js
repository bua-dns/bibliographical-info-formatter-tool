import fs from 'fs/promises';
import path from 'path';
import { parseStringPromise } from 'xml2js';
import { formatCitation } from './useFormatCitation.js';


const BASE_URL = 'https://sru.k10plus.de/opac-de-627';


// Fetch XML Data
const fetchXmlData = async (id) => {
    const url = `${BASE_URL}?version=1.1&operation=searchRetrieve&query=pica.ppn=${id}&recordSchema=picaxml&startRecord=1&maximumRecords=1`;
    console.log(`Fetching XML from: ${url}`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch XML: ${response.statusText} (Status: ${response.status})`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Error fetching XML: ${error.message}`);
        throw error;
    }
};

// Parse XML to JSON
const parseXmlToJson = async (xmlData) => {
    try {
        return await parseStringPromise(xmlData, {
            explicitArray: false,
            mergeAttrs: true,
        });
    } catch (error) {
        console.error('Error parsing XML to JSON:', error.message);
        throw error;
    }
};

// Reduce and Map JSON Data
const transformJsonData = (jsonData) => {
    try {
        const reducedData = jsonData['zs:searchRetrieveResponse']['zs:records']['zs:record']['zs:recordData']['record']['datafield'];
        return reducedData.map((field) => {
            const tag = field['tag'];
            return { [tag]: field };
        });
    } catch (error) {
        console.error('Error reducing JSON data:', error.message);
        throw error;
    }
};

// Enhance JSON Data with Subfield Mapping
const enhanceJsonData = (mappedData) => {
    const enhancedData = {};

    mappedData.forEach((item) => {
        const key = Object.keys(item)[0];
        const entry = item[key];

        // Flatten subfield data
        const flattenedEntry = {};
        if (entry.subfield) {
            if (Array.isArray(entry.subfield)) {
                entry.subfield.forEach((sub) => {
                    if (sub.code && sub._) {
                        flattenedEntry[sub.code] = sub._;
                    }
                });
            } else if (entry.subfield.code && entry.subfield._) {
                flattenedEntry[entry.subfield.code] = entry.subfield._;
            }
        }

        // Add or append the flattened entry to the result object
        if (!enhancedData[key]) {
            enhancedData[key] = [];
        }
        enhancedData[key].push(flattenedEntry);
    });

    return enhancedData;
};

// Main Function: Fetch and Process Data
export async function fetchAndProcess ({ id }) {
    try {
        const xmlData = await fetchXmlData(id);

        const jsonData = await parseXmlToJson(xmlData);
        const mappedData = transformJsonData(jsonData);
        const enhancedData = enhanceJsonData(mappedData);
        console.log('Enhanced Data:', formatCitation(enhancedData, 'dns', 'de'));
        return formatCitation(enhancedData, 'dns', 'de');

    } catch (error) {
        console.error('Error during processing:', error.message);
    }
};
