var url = "https://raw.githubusercontent.com/tylerspck/Plotly-Challenge/master/data/samples.json"

function init() {
    d3.json(url).then((json_data) => {
        // console.log(json_data)
        var names = json_data.names;
        // console.log(names)
        var metadata = json_data.metadata;
        console.log(metadata)
        var samples = json_data.samples;
        console.log(samples)

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




function demograph_info(selected_id) {
    d3.json(url).then((demo_data) => {
        var metadata = demo_data.metadata;
        var filter_metadata = metadata.filter(metadata_name => metadata_name.id == selected_id)[0];
        var metadata_index = d3.select("#sample-metadata")
        metadata_index.html('');
        Object.entries(filter_metadata).forEach(([k, v]) => {
            metadata_index.append("p").text(`${k}: ${v}`)
        });
    });
};

function horizontal_bargraph(selected_id) {
    d3.json(url).then((sample_data) => {
        var sample = sample_data.samples;
        var filter_sampledata = sample.filter(sample_name => sample_name.id == selected_id)[0];
        var top10_otu_ids = filter_sampledata.otu_ids.slice(0,10).map(otu_ids => "OTU" + otu_ids.toString()).reverse();
        var top10_otu_labels = filter_sampledata.otu_labels.slice(0,10).reverse();
        var top10_values =  filter_sampledata.sample_values.slice(0,10).reverse();
        // console.log(top10_otu_labels);
        // console.log(top10_values);
        // console.log(top10_otu_ids)


        var bar_index = d3.select("#bar")
        bar_index.html('');
        var trace = {
            x: top10_values,
            y: top10_otu_ids,
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
        console.log(washes);
       


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
                axis: { range: [null, 10] },
                steps: [
                    { range: [2, 6], color: "lightgray" },
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

function bubble_chart() {

};


function optionChanged(newSelection) {
    demograph_info(newSelection);
    horizontal_bargraph(newSelection);
    washing_guage(newSelection);
    bubble_chart(newSelection)
    console.log(newSelection)
};

init()