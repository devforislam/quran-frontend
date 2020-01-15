
export  function range(start, end) {
    
    if (start && end === '') {
        return [start];
    } else if (start === '' && end) {
        return [end];
    }
    
    start = parseInt(start, 10);
    end = parseInt(end, 10);

    let temp = start;

    if (start > end) {
        start = end;
        end = temp;
    }

    const length = end - start + 1;

    return Array.from({length}, (v, i) =>  i + start);
}

export function groupBy(items, key) {
    return items.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
