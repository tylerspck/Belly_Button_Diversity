d3.json("data/sample.json").then((json_data) => {
    console.log(json_data)
    var names = json_data.names;
    console.log(names)
    var metadata = json_data.metadata;
    console.log(metadata)
    var samples = json_data.samples;
    console.log(samples)

    var select = document.getElementById("#selDataset")
    names.forEach(nam => {
        var opt = options[nam];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    });

    
}); 




// https://raw.githubusercontent.com/tylerspck/Plotly-Challenge/master/data/samples.json