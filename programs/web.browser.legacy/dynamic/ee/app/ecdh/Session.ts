function module(t,r,e){e.link("@babel/runtime/regenerator",{default:function(t){n=t}},0),e.link("@babel/runtime/helpers/createClass",{default:function(t){s=t}},1),e.export({Session:function(){return o}}),e.link("sodium-plus",{SodiumPlus:function(t){u=t},X25519PublicKey:function(t){i=t}},0);var n,s,u,i,a,o=function(){function t(){this.stringFormatKey="base64",this.stringFormatEncryptedData="base64",this.stringFormatRawData="base64",this.decryptKey=void 0,this.encryptKey=void 0,this.secretKey=void 0,this.publicKey=void 0}var r=t.prototype;return r.sodium=function(){return n.async(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",a||u.auto());case 1:case"end":return t.stop()}},null,null,null,Promise)},r.publicKeyFromString=function(t){return new i(Buffer.from(t,this.stringFormatKey))},r.encryptToBuffer=function(t){var r,e,s;return n.async(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,n.awrap(this.sodium());case 2:return r=u.sent,u.next=5,n.awrap(r.randombytes_buf(24));case 5:return e=u.sent,u.next=8,n.awrap(r.crypto_secretbox(Buffer.from(t).toString(this.stringFormatRawData),e,this.encryptKey));case 8:return s=u.sent,u.abrupt("return",Buffer.concat([e,s]));case 10:case"end":return u.stop()}},null,this,null,Promise)},r.encrypt=function(t){var r;return n.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.awrap(this.encryptToBuffer(t));case 2:return r=e.sent,e.abrupt("return",r.toString(this.stringFormatEncryptedData));case 4:case"end":return e.stop()}},null,this,null,Promise)},r.decryptToBuffer=function(t){var r,e,s;return n.async(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,n.awrap(this.sodium());case 2:return r=u.sent,e=Buffer.from(Buffer.isBuffer(t)?t.toString():t,this.stringFormatEncryptedData),u.next=6,n.awrap(r.crypto_secretbox_open(e.slice(24),e.slice(0,24),this.decryptKey));case 6:return s=u.sent,u.abrupt("return",Buffer.from(s.toString(),this.stringFormatRawData));case 8:case"end":return u.stop()}},null,this,null,Promise)},r.decrypt=function(t){var r;return n.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.awrap(this.decryptToBuffer(t));case 2:return r=e.sent,e.abrupt("return",r.toString());case 4:case"end":return e.stop()}},null,this,null,Promise)},s(t,[{key:"publicKeyString",get:function(){return this.publicKey.toString(this.stringFormatKey)}}]),t}()}
//# sourceMappingURL=/dynamic/ee/app/ecdh/4252f9936ee076a3588f3dee00f78964c5e859d0.map