export function MaskedDate(event: any) {
    if (event.keyCode === 8) {
       // alert('anu');
    } else if (event.keyCode === 9) {
        // alert('anu');
    } else {
   var v = event.target.value;
   if (v.match(/^\d{2}$/) !== null) {
       event.target.value = v + '/';
   } else if (v.match(/^\d{1}[./-]$/)) {
       if (v.includes('-')) {
           event.target.value = '0' + v.replace('-', '/');
       } else if (v.includes('.')) {
           event.target.value = '0' + v.replace('.', '/');
       } else {
           event.target.value = '0' + v;
       }
   } else if (v.match(/^\d{2}[./-]$/) !== null) {
       // alert('else' + v);
       if (v.includes('-')) {
           event.target.value = v.replace('-', '/');
       } else if (v.includes('.')) {
           event.target.value = v.replace('.', '/');
       } else {
           event.target.value = v;
       }
   }
   else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
       // alert('else' + v);
       event.target.value = v + '/';
   }  else if (v.match(/^\d{2}\/\d{2}[./-]$/) !== null) {
       // alert('else' + v);
       if (v.includes('-')) {
           v = v.replace('-', '/');
            // alert(v);
           event.target.value = v;
           // if (event.target.value.split('/')[1].toString().length === 1) {
           //     event.target.value = '0' + ;
           // }
       } else if (v.includes('.')) {
           v = v.replace('.', '/');
           event.target.value = v;
       } else {
           event.target.value =  v;
       }
   }
   else if (v.match(/^\d{2}\/\d{1}[./-]$/)) {
       if (v.includes('-')) {
           v = v.replace('-', '/');
            // alert(v);
           event.target.value = v.substr(0, 3) + '0' + v.substr(3, 2);
           // if (event.target.value.split('/')[1].toString().length === 1) {
           //     event.target.value = '0' + ;
           // }
       } else if (v.includes('.')) {
           v = v.replace('.', '/');
           event.target.value = v.substr(0, 3) + '0' + v.substr(3, 2);
       } else {
           event.target.value =  v.substr(0, 3) + '0' + v.substr(3, 2);
       }
   }
}
}

export function ExpDate(event: any){
    if (event.keyCode === 8) {
        // alert('anu');
     } else if (event.keyCode === 9) {
         // alert('anu');
     } else {
    var v = event.target.value;
    if (v.match(/^\d{2}$/) !== null) {
        event.target.value = v + '/';
    }
}
}
