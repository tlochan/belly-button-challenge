//Use the D3 library to read in samples.json 
//from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";
d3.json(url).then(function(data){
    //initial bar chart
    // ---------------------------------------------------------------------------------
    //create values for initial bar chart with first entry in dataPromise
    let ids = data.samples[0].otu_ids.slice(0,10);
    let init_ids = ids.map((id) => {return "OTU"+id;});
    let init_samples = data.samples[0].sample_values.slice(0,10);
    let init_labels = data.samples[0].otu_labels.slice(0,10);

    let bub_ids = data.samples[0].otu_ids;
    let bub_samples = data.samples[0].sample_values;
    let bub_labels = data.samples[0].otu_labels;

    let initM = data.metadata[0];
    function addTextFromObject() {
        // Select the HTML element
        let outputElement = document.getElementById("sample-metadata");
    
        // Get the text from the object
        let textToAdd = 
        "id: "+ initM.id +
        "\n age:" +initM.age +
        "\n bbtype : " + initM.bbtype+
        "\n ethnicity : " +initM.ethnicity +
        "\n gender : " + initM.gender+
        "\n location : " + initM.location+
        "\n wfreq : " + initM.wfreq 
        ;
    
        // Set the text as the content of the HTML element
        outputElement.textContent = textToAdd;
    }
    addTextFromObject();

   

    // reverse initial lists to sort desc.
    init_ids.reverse();
    init_samples.reverse();
    init_labels.reverse();

    //initialization function 
    function init() {
        // - hBar chart
        let trace = {
            x:init_samples,
            y:init_ids,
            text:init_labels,
            type:'bar',
            orientation:'h',
        };

        //h bar chart for initial 
        let data = [trace];
        let layout = {
            title:"Top 10 Strains for Subject 940",
            height:600,
            width:800
        };

        // - bubble chart
        let bubTrace = {
            x:bub_ids,
            y:bub_samples,
            text: bub_labels,
            mode:'markers',
            marker: {
                size: bub_samples,
                color: bub_ids,
                colorscale: 'Plasma',
                colorbar: {
                    title: 'OTU ID'
                }
            }
        };
        let bubData = [bubTrace];

        let bubLayout = {
            title: 'OTU Bubble Chart',
            height:800,
            width:1200,
            xaxis: {
                title: 'OTU ID'
            },
            yaxis: {
                title: 'Sample Values'
            }
        };


        Plotly.newPlot("bar",data,layout);
        Plotly.newPlot('bubble',bubData,bubLayout);


    };
    init();

    }


);
//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function optionChanged(selectedID) {
    // Call the function defined inside the D3 data function
    data = d3.json(url).then(function(i){
    let idArray = i.names;
    function indexID(id){
        return idArray.indexOf(id);
    };
    let index = indexID(selectedID);

    console.log("Selected ID: " + selectedID);
    console.log("The Index of the ID: " + index);
    
    let meta = i.metadata[index];
    console.log(meta);
    function addTextFromObject() {
        // Select the HTML element
        let outputElement = document.getElementById("sample-metadata");
    
        // Get the text from the object
        let textToAdd = 
        "id: "+ meta.id +
        "\n age:" +meta.age +
        "\n bbtype : " + meta.bbtype+
        "\n ethnicity : " +meta.ethnicity +
        "\n gender : " + meta.gender+
        "\n location : " + meta.location+
        "\n wash frequency : " + meta.wfreq 
        ;
    
        // Set the text as the content of the HTML element
        outputElement.textContent = textToAdd;
    }
    addTextFromObject();
    //Dropdown Bar Chart
    function dropBar(i,index) {
        //create values for drop bar chart with index
        let ids = i.samples[index].otu_ids.slice(0,10);
        let drop_ids = ids.map((id) => {return "OTU"+id;});
        let drop_samples = i.samples[index].sample_values.slice(0,10);
        let drop_labels = i.samples[index].otu_labels.slice(0,10);

    // reverse drop lists to sort desc.
    drop_ids.reverse();
    drop_samples.reverse();
    drop_labels.reverse();
    
    let trace = {
            //Use sample_values as the values for the bar chart.
            x:drop_samples,
            //Use otu_ids as the labels for the bar chart.
            y:drop_ids,
            //Use otu_labels as the hovertext for the chart.
            text:drop_labels,
            type:'bar',
            orientation:'h',
        };

        //h bar chart for drop 
        let plotData = [trace];
        let layout = {
            title:`Top 10 Belly Button Strains for individual ${selectedID} `,
            height:600,
            width:800,
            xaxis: {
                title: 'Sample Count' // Change the x-axis label
            },
            yaxis: {
                title: 'OTU Strain ID' // Change the y-axis label
            }
        };

        Plotly.newPlot("bar",plotData,layout);
    }
    function dropBub(i,index) {
        let drop_bub_ids = i.samples[index].otu_ids;
        let drop_bub_samples = i.samples[index].sample_values;
        let drop_bub_labels = i.samples[index].otu_labels;

        let drop_bubTrace = {
            x:drop_bub_ids,
            y:drop_bub_samples,
            text: drop_bub_labels,
            mode:'markers',
            marker: {
                size: drop_bub_samples,
                color: drop_bub_ids,
                colorscale: 'Rainbow',
                colorbar: {
                    title: 'OTU ID'
                }
            }
        };
        let drop_bubData = [drop_bubTrace];

        let drop_bubLayout = {
            title: `OTU Bubble Chart for individual ${selectedID}`,
            height:800,
            width:1200,
            xaxis: {
                title: 'OTU ID'
            },
            yaxis: {
                title: 'Sample Values'
            }
        };
        Plotly.newPlot('bubble',drop_bubData,drop_bubLayout);

    }
    dropBar(i,indexID(selectedID));
    dropBub(i,indexID(selectedID));
            });
        };






