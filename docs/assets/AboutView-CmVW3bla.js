import{_ as P,r as d,c as _,a as s,b as t,w as x,v as y,d as c,e as T,f as o,F as K,t as p,g as N,o as i}from"./index-B9AWmxeE.js";const w={class:"controls content-element"},I={class:"search-control"},D={key:0,class:"content-element info"},F={class:"display content-element"},C=["href"],L={class:"output"},A={class:"display content-element"},V={key:0},$=["href"],z={class:"output"},S={__name:"AboutView",setup(B){const l=d(null);d(!1),d(null);const n=d(""),a=d(null),k=_(()=>!a.value);async function h(){if(!/^\d{8,11}$/.test(n.value)){n.value="";return}a.value=n.value;try{const e=await N({id:n.value});l.value=e}catch(e){console.error("Failed to fetch data:",e)}}function b(){n.value="",a.value=null,l.value=null}function v(r){return`https://opac.k10plus.de/DB=2.299/PPNSET?PPN=${r}`}function m(r){navigator.clipboard.writeText(r).then(()=>{console.log("Text copied to clipboard")}).catch(e=>{console.error("Failed to copy text: ",e)})}return(r,e)=>{var f,g;return i(),s("main",null,[e[9]||(e[9]=t("div",{class:"headings content-element"},[t("h1",null,"Formatierungstool bibliografische Informationen"),t("h2",null,"für K10plus-Daten")],-1)),t("div",w,[t("div",I,[x(t("input",{type:"text",class:"search","onUpdate:modelValue":e[0]||(e[0]=u=>n.value=u),placeholder:"PPN eingeben"},null,512),[[y,n.value]]),n.value.length?(i(),s("button",{key:0,onClick:e[1]||(e[1]=u=>h())},"Abschicken")):c("",!0),n.value?(i(),s("img",{key:1,src:T,alt:"Edit",class:"icon close-icon",onClick:e[2]||(e[2]=u=>b())})):c("",!0)])]),k.value?(i(),s("div",D,e[5]||(e[5]=[t("p",null,[o(" Dieses Tool ermöglicht die Formatierung bibliografischer Informationen aus dem "),t("a",{href:"https://opac.k10plus.de/",alt:"zum K10Plus-Katalog",target:"_blank"},"K10plus-Katalog"),o('. Geben Sie eine Hier die Pica-Produktions-Nummer (PPN) ein und klicken Sie auf "Abschicken", um die bibliografischen Informationen für das entsprechende Werk zu erhalten. Die Informationen können als Text oder HTML kopiert werden. ')],-1),t("p",null,[o("Die PPN steht bei Einträgen im "),t("a",{href:"https://opac.k10plus.de/",alt:"zum K10Plus-Katalog",target:"_blank"},"OPAC von K10plus"),o("im ersten Feld.")],-1)]))):c("",!0),l.value?(i(),s(K,{key:1},[t("div",F,[t("div",null,[t("h4",null,[e[6]||(e[6]=o("Literaturangabe für ")),t("a",{href:v(a.value),alt:"Link zum Katalogeintrag",target:"_blank"},"PPN "+p(a.value),9,C)]),t("div",L,p((f=l.value)==null?void 0:f.plainText),1),t("button",{onClick:e[3]||(e[3]=u=>m(l.value.plainText))},"In die Zwischenablage kopieren")])]),t("div",A,[(i(),s("div",V,[t("h4",null,[e[7]||(e[7]=o("Literaturangabe für ")),t("a",{href:v(a.value),alt:"Link zum Katalogeintrag",target:"_blank"},"PPN "+p(a.value),9,$),e[8]||(e[8]=o("im HTML-Format"))]),t("div",z,p((g=l.value)==null?void 0:g.html),1),t("button",{onClick:e[4]||(e[4]=u=>m(l.value.plainText))},"In die Zwischenablage kopieren")]))])],64)):c("",!0),c("",!0)])}}},H=P(S,[["__scopeId","data-v-4ede85ce"]]);export{H as default};
