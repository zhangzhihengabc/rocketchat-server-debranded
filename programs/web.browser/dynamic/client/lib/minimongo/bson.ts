function module(e,r,t){let n;t.export({getBSONType:()=>a,compareBSONValues:()=>c}),t.link("./types",{BSONType(e){n=e}},0);let a=e=>"number"==typeof e?n.Double:"string"==typeof e?n.String:"boolean"==typeof e?n.Boolean:Array.isArray(e)?n.Array:null===e?n.Null:e instanceof RegExp?n.Regex:"function"==typeof e?n.JavaScript:e instanceof Date?n.Date:e instanceof Uint8Array?n.BinData:n.Object,o=e=>{switch(e){case n.Null:return 0;case n.Double:case n.Int:case n.Long:return 1;case n.String:case n.Symbol:return 2;case n.Object:return 3;case n.Array:return 4;case n.BinData:return 5;case n.ObjectId:return 6;case n.Boolean:return 7;case n.Date:case n.Timestamp:return 8;case n.Regex:return 9;case n.JavaScript:case n.JavaScriptWithScope:return 100;default:return -1}},c=(e,r)=>{if(void 0===e)return void 0===r?0:-1;if(void 0===r)return 1;let t=a(e),i=o(t),s=a(r),u=o(s);if(i!==u)return i<u?-1:1;if(t!==s)throw Error("Missing type coercion logic in compareBSONValues");switch(t){case n.Double:return e-r;case n.String:return e.localeCompare(r);case n.Object:return c(Array.prototype.concat.call([],...Object.entries(e)),Array.prototype.concat.call([],...Object.entries(r)));case n.Array:for(let t=0;;t++){if(t===e.length)return t===r.length?0:-1;if(t===r.length)return 1;let n=c(e[t],r[t]);if(0!==n)return n}case n.BinData:if(e.length!==r.length)return e.length-r.length;for(let t=0;t<e.length;t++)if(e[t]!==r[t])return e[t]<r[t]?-1:1;return 0;case n.Null:case n.Undefined:return 0;case n.ObjectId:return e.toHexString().localeCompare(r.toHexString());case n.Boolean:return Number(e)-Number(r);case n.Date:return e.getTime()-r.getTime();case n.Regex:throw Error("Sorting not supported on regular expression");case n.JavaScript:case n.JavaScriptWithScope:throw Error("Sorting not supported on Javascript code")}throw Error("Unknown type to sort")}}
//# sourceMappingURL=/dynamic/client/lib/minimongo/3cadcc2da6aadd5113dd323b4b9acaddf1c67f11.map