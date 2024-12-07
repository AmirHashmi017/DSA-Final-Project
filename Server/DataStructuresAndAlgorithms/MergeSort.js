const fs = require("fs");
const MergeSort=(array)=>
{
    if(array.length<=1)
    {
        return array;
    }
    const mid=Math.floor(array.length/2);
    const LeftArray=MergeSort(array.slice(0,mid));
    const RightArray=MergeSort(array.slice(mid));
    return Merge(LeftArray,RightArray);
}

function Merge(LeftArray,RightArray)
{
    let i=0;
    let j=0;
    let output=[]
    while(i<LeftArray.length && j<RightArray.length)
    {
        if(LeftArray[i]<=RightArray[j])
        {
            output.push(LeftArray[i]);
            i+=1;
        }
        else
        {
            output.push(RightArray[j]);
            j+=1;
        }
    }

    while(i<LeftArray.length)
    {
        output.push(LeftArray[i]);
        i+=1;
    }

    while(j<RightArray.length)
    {
        output.push(RightArray[j]);
        j+=1;
    }
    return output;
}

module.exports = MergeSort;
