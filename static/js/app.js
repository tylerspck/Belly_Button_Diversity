var url = "https://raw.githubusercontent.com/tylerspck/Plotly-Challenge/master/data/samples.json"

function init() {
    d3.json(url).then((json_data) => {
        // console.log(json_data)
        var names = json_data.names;
        // console.log(names)
        // var metadata = json_data.metadata;
        // console.log(metadata)
        // var samples = json_data.samples;
        // console.log(samples)

        var dropdown = d3.select("#selDataset");

        names.forEach((item) => {
            dropdown.append("option")
            .text(item)
            .property("value", item)
        });

        var init_id = names[0];
    
        demograph_info(init_id);
        horizontal_bargraph(init_id);
        washing_guage(init_id);
        bubble_chart(init_id)
    
    });
};

d3.select("#selDataset").on("change", function() {
    var newSelection = d3.select("#selDataset").property("value")
    console.log(newSelection)
    demograph_info(newSelection);
    horizontal_bargraph(newSelection);
    washing_guage(newSelection);
    bubble_chart(newSelection)
});


function demograph_info(selected_id) {
    d3.json(url).then((demo_data) => {
        var metadata = demo_data.metadata;
        var filter_metadata = metadata.filter(metadata_name => metadata_name.id == selected_id)[0];
        var metadata_index = d3.select("#sample-metadata")
        metadata_index.html('');
        Object.entries(filter_metadata).forEach(([k, v]) => {
            metadata_index.append("p").text(`${k.toUpperCase()}: ${v}`)
        });
    });
};

function horizontal_bargraph(selected_id) {
    d3.json(url).then((sample_data) => {
        var sample = sample_data.samples;
        var filter_sampledata = sample.filter(sample_name => sample_name.id == selected_id)[0];
        var top10_otu_ids = filter_sampledata.otu_ids.slice(0,10);
        var string_top10_otu_ids = top10_otu_ids.map(otu_ids => "OTU" + otu_ids.toString()).reverse();
        var top10_otu_labels = filter_sampledata.otu_labels.slice(0,10).reverse();
        var top10_values =  filter_sampledata.sample_values.slice(0,10).reverse();
        // console.log(top10_otu_labels);
        // console.log(top10_values);
        // console.log(top10_otu_ids)


        var bar_index = d3.select("#bar")
        bar_index.html('');
        var trace = {
            x: top10_values,
            y: string_top10_otu_ids,
            text: top10_otu_labels,
            orientation: 'h',
            type: 'bar'
        };

        var databar = [trace];

        var barchart_Layout = {
            title:"Top Operational Taxonomic Units Found "
        };

        Plotly.newPlot('bar', databar, barchart_Layout)
    });
};

function washing_guage(selected_id) {
    d3.json(url).then((sample_data) => {
        var metadata = sample_data.metadata;
        var filter_washing = metadata.filter(sample_name => sample_name.id == selected_id)[0];
        var washes = filter_washing.wfreq;
        // console.log(washes);
       


        var guage_index = d3.select("#gauge")
        guage_index.html('');
        var trace = {
            domain: { x: [0, 1], y: [0, 1] },
            value: washes,
            title: { text: "Belly Button Washing Frequency"},
            annotations: [{
                text: "Scrubs per Week",
                font:{size: 13}
            }],
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 9] },
                steps: [
                    { range: [2, 5], color: "lightgray" },
                    { range: [0, 2], color: "gray" }
                ],
                    threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                        value: 2
                }
            }
        };

        var dataguage = [trace];

        var guage_Layout = {
            width: 600, height: 450, margin: { t: 0, b: 0 }
        };

        Plotly.newPlot('gauge', dataguage, guage_Layout)
    });
};

function bubble_chart(selected_id) {
    d3.json(url).then((sample_data) => {
        var sample = sample_data.samples;
        var filter_bubble_data = sample.filter(sample_name => sample_name.id == selected_id)[0];
        var otu_ids = filter_bubble_data.otu_ids
        var sample_values = filter_bubble_data.sample_values
        var otu_labels = filter_bubble_data.otu_labels

        // console.log(filter_bubble_data);
        // console.log(otu_ids)
        // console.log(sample_values)



        var bubble_index = d3.select("#bubble")
        bubble_index.html('');
        var trace = { 
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values
            }
        };

        var databubble = [trace];

        var bubble_Layout = {
            xaxis:{
                title: {text:"OTU ID"}
            },
            showlegend: false,
            autosize: true
        };

        var config = { responsive: true }

        Plotly.newPlot('bubble', databubble, bubble_Layout, config)
    });
};

init()