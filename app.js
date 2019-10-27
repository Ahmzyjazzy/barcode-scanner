(function(){

    var scannerInput = $('#scanner-input');
    scannerInput.focus();

    //set some defaut
    $('.event-year').html(new Date().getFullYear()+1);

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
        let result = {};
        console.log(url);
        fetch(url)
        .then((res) => res.json())
        .then((dtmessage)=>{
            if(dtmessage.status == 'SUCCESS' && dtmessage.data){
                dtmessage.data.forEach(function(item){
                    result[item.QST_display_text] = item.ANS_value;
                });
                $.extend(result, dtmessage.data[0]);
                //use result
                console.log(result);
                $('.fname').html(result.ATT_fname);
                $('.sname').html(result.ATT_lname);
                $('.company').html(result['Company']);
                $('.type').html(result['Participant Type']);
                $('.sector').html(result.CNT_name);
                $('.audience-type').html(result['Participant Category']);

            }else{
                $('.audience-detail span').html("");
                alert('No record found due to '+dtmessage.message);
            }
        })
    }

    function printDiv() {
        var divToPrint=document.querySelector('.audience-detail');
        var newWin=window.open('','Print-Window');
        newWin.document.open();
        newWin.document.write('<html><link rel="stylesheet" href="app.css"><body onload="window.print()">'+divToPrint.outerHTML+'</body></html>');
        newWin.document.close();
        setTimeout(function(){newWin.close();},10);
    }

    $('.clear').on('click',function(){
        window.location.reload();
    });

    $('.print').on('click', function(){
        printDiv();
    });

}());