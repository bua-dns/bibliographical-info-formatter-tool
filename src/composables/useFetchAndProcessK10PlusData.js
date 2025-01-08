import { XMLParser } from 'fast-xml-parser';
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

/* Parse XML to JSON
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
*/

const parseXmlToJson = (xmlData) => {
    try {
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '',
            isArray: (name, jpath, isLeafNode) => false,
        });
        const jsonData = parser.parse(xmlData);
        console.log('JSON Data:', jsonData);
        return parser.parse(xmlData);
    } catch (error) {
        console.error('Error parsing XML to JSON:', error.message);
        throw error;
    }
};
// Reduce and Map JSON Data
/*
const transformJsonData = (jsonData) => {
    try {
        const reducedData = jsonData['zs:searchRetrieveResponse']['zs:records']['zs:record']['zs:recordData']['record']['datafield'];
        console.log('Reduced Data:', reducedData.length);
        return reducedData.map((field) => {
            const tag = field['tag'];
            return { [tag]: field };
        });
    } catch (error) {
        console.error('Error reducing JSON data:', error.message);
        throw error;
    }
};
*/
const transformJsonData = (jsonData) => {
    try {
        // Adjusted to the new JSON structure
        const reducedData = jsonData['zs:searchRetrieveResponse']['zs:records']['zs:record']['zs:recordData']['record']['datafield'];
        console.log('Reduced Data:', reducedData.length);
        return reducedData.map((field) => {
            const tag = field['tag'];
            return { [tag]: field };
        });
    } catch (error) {
        console.error('Error reducing JSON data:', error.message);
        throw error;
    }
};
/*
// Enhance JSON Data with Subfield Mapping
const enhanceJsonData = (mappedData) => {
    const enhancedData = {};
    console.log('Mapped Data:', mappedData.length);
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
*/
const enhanceJsonData = (mappedData) => {
    const enhancedData = {};
    console.log('Mapped Data:', mappedData.length);

    mappedData.forEach((item) => {
        const key = Object.keys(item)[0];
        const entry = item[key];

        // Flatten subfield data
        const flattenedEntry = {};
        if (entry.subfield) {
            if (Array.isArray(entry.subfield)) {
                entry.subfield.forEach((sub) => {
                    if (sub.code && sub["#text"]) {
                        flattenedEntry[sub.code] = sub["#text"];
                    }
                });
            } else if (entry.subfield.code && entry.subfield["#text"]) {
                flattenedEntry[entry.subfield.code] = entry.subfield["#text"];
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

        const jsonData = parseXmlToJson(xmlData);
        const mappedData = transformJsonData(jsonData);
        const enhancedData = enhanceJsonData(mappedData);
        return formatCitation(enhancedData, 'dns', 'de');

    } catch (error) {
        console.error('Error during processing:', error.message);
    }
};
