/** Mark scalar components written at the beginning of a dynamic attribute.
 * Multiple updates may precede the next GPU upload: retain their pending union
 * as one prefix. An empty draw changes neither pending work nor the version.
 */
export function markActiveAttribute(attribute,componentCount){
 if(!Number.isInteger(componentCount)||componentCount<0||componentCount>attribute.array.length)throw new RangeError('Active component count exceeds attribute capacity');
 if(componentCount===0)return false;
 let end=componentCount;
 for(const range of attribute.updateRanges)end=Math.max(end,range.start+range.count);
 attribute.clearUpdateRanges();attribute.addUpdateRange(0,end);attribute.needsUpdate=true;
 return true;
}
