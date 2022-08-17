const jobScheduling = (startTime, endTime, profit) => {
    
    let n = startTime.length;
    let profitTracker = new Array (n); // will keep track of profit up until i
    let nodes = []; // array of nodes with start/end/profit info in order by start time
    
    // place Nodes into nodes array
    for (let i = 0; i < n; i++){
        let node = new Node(startTime[i], endTime[i], profit[i]);
        nodes.push(node);
    }
    
    // sort nodes array by start time. If start time is equal, sort by end time
    const compare = (a,b) => {
        return (a.start - b.start == 0) ? (a.end - b.end) : (a.start - b.start);
    }
    
    nodes.sort(compare);
    
    //start with the last interval
    profitTracker[n-1] = nodes[n-1].profit;
    
    // fills up profitTracker starting from ther end
    for (let i = n - 2; i >= 0; i--){
        // look to see which elements after current has the least greatest start time
        let index = binarySearch(nodes, nodes[i].end, i);
        // returns found index (if found)
        let profit = index === -1 ? 0: profitTracker[index];
        
        // tracks if the of found index is the maximum result
        profitTracker[i] = Math.max(profitTracker[i+1], profit + nodes[i].profit);
    }

    // first element will be the highest profit
    return profitTracker[0];
};



class Node {
    constructor(start, end, profit){
        this.start = start;
        this.end = end;
        this.profit = profit;
    }
}


const binarySearch = (nodes, curEndTime, curIndex) => {
    
    /* searches nodes from current to end of nodes for the node with the least
       greatest start time compared to the current node's end time */
    let start = curIndex 
    let end = nodes.length - 1
    let result = -1
    
    while (start <= end) {
        
        let mid = Math.floor((start + end) / 2)
       
        if (nodes[mid].start >= curEndTime) {
            // updates result but continues to look for a smaller possibility
            result = mid
            end = mid - 1
        } else {
            start = mid + 1
        }
    }
    return result
}
