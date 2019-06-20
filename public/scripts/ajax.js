
function update(){
            var res = document.getElementById("result").contentWindow.document;
            res.open();
            res.write(eh.getValue());
            //for css
            res.write('<style>'+ec.getValue()+'</style>');
             //for js
            res.write('<script>'+ej.getValue()+'</script>');
            res.close();
        }
        
        function seteditor(){
            //HTML
            window.eh = ace.edit("htmleditor");
            eh.setTheme("ace/theme/monokai");
            eh.session.setMode("ace/mode/html");
            //CSS
            window.ec = ace.edit("csseditor");
            ec.setTheme("ace/theme/monokai");
            ec.session.setMode("ace/mode/css");
            //JS
            window.ej = ace.edit("jseditor");
            ej.setTheme("ace/theme/monokai");
            ej.session.setMode("ace/mode/css");
            
            
            eh.getSession().on("change", function(){
               update(); 
            });
            
            ec.getSession().on("change", function(){
               update(); 
            });
            
            ej.getSession().on("change", function(){
               update(); 
            });
        }
        seteditor();
        update();