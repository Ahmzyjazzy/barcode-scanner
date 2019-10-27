(function(){

    var scannerInput = $('#scanner-input');
    scannerInput.focus();

    //set some defaut
    $('.event-year').html(new Date().getFullYear());

    //initialize plugin    
    scannerInput.scannerDetection({
        timeBeforeScanTest: 200, // wait for the next character for upto 200ms
        avgTimeByChar: 100, // it's not a barcode if a character takes longer than 100ms
        onComplete: function(barcode, qty){
            scannerInput.selet();
            scannerInput.val(barcode);
            (barcode && fetchUserinfo(barcode));
        } // main callback function	
    });

    scannerInput.keydown(function(e){
        var barcode = $(this).val();
        if(e.keyCode === 13){
            (barcode && fetchUserinfo(barcode));
        }  
    });

    function fetchUserinfo(barcode){
        let url = `http://eventag.waashow.org/tagData.php?barcode="${barcode}"`;
        console.log(url);
        fetch(url,
            {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', 
                cache: 'no-cache',
                credentials: 'same-origin', // include, *same-origin, omit
        })
        .then((res) => res.json())
        .then((data)=>{
            console.log(data);
    // fname
    // sname
    // audience-type

        })
    }

    

}());