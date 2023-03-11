let funding_url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";

let fundingData;

let canvas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");

let drawTreeMap = () => {
    let hierarchy = d3.hierarchy(fundingData, (node) => {
        return node['children'];
    }).sum((node) => {
        return node['value'];
    }).sort((node1, node2) => {
        return node2['value'] - node1['value'];
    })

    let createTreeMap = d3.treemap().size([1000, 600]);

    createTreeMap(hierarchy);

    let fundingTiles = hierarchy.leaves();
    console.log(fundingTiles);

    let block = canvas.selectAll('g')
        .data(fundingTiles)
        .enter()
        .append('g')
        .attr('transform', (funding) => {
            return 'translate(' + funding['x0'] + ', ' + funding['y0'] + ')';
        })

    block.append('rect')
        .attr('class', 'tile')
        .attr('fill', (funding) => {
            let category = funding['data']['category'];
            if (category === "Product Design") {
                return '#ff00ff';
            } else if (category === "Tabletop Games") {
                return '#bf00ff';
            } else if (category === "Gaming Hardware") {
                return '#8000ff';
            } else if (category === "Video Games") {
                return '#4000ff';
            } else if (category === "Sound") {
                return '#0000ff';
            } else if (category === "Television") {
                return '#0040ff';
            } else if (category === "Narrative Film") {
                return '#0080ff';
            } else if (category === "Web") {
                return '#00bfff';
            } else if (category === "Hardware") {
                return '#00ffff';
            } else if (category === "Games") {
                return '#00ff15';
            } else if (category === "3D Printing") {
                return '#aaff00';
            } else if (category === "Technology") {
                return '#ffff00';
            } else if (category === "Wearables") {
                return '#ffe100';
            } else if (category === "Sculpture") {
                return '#ff0040';
            } else if (category === "Apparel") {
                return '#ea0055';
            } else if (category === "Food") {
                return '#d5006a';
            } else if (category === "Art") {
                return '#bf0080';
            } else if (category === "Gadgets") {
                return '#9500aa';
            } else {
                return '#8000bf'
            }
        }).attr('data-name', (funding) => {
            return funding['data']['name'];
        }).attr('data-category', (funding) => {
            return funding['data']['category'];
        }).attr('data-value', (funding) => {
            return funding['data']['value'];
        })
        .attr('width', (funding) => {
            return (funding['x1'] - funding['x0']);
        })
        .attr('height', (funding) => {
            return (funding['y1'] - funding['y0']);
        })
        .on('mouseover', (Object, funding) => {
            tooltip.transition()
                .style('visibility', 'visible');

            let fund = funding['data']['value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            tooltip.html(
                '$ ' + fund + '<hr />' + funding['data']['name']
            );

            tooltip.attr('data-value', funding['data']['value']);
        })
        .on('mouseout', (Object, funding) => {
            tooltip.transition()
                .style('visibility', 'hidden');
        })
    
    block.append('text')
            .text((funding) => {
                return funding['data']['name'];
            })
            .attr('x', 5)
            .attr('y', 20);
}

d3.json(funding_url).then(
    (data, error) => {
        if (error) {
            console.log(error);
        } else {
            fundingData = data;
            console.log(fundingData);

            drawTreeMap();
        }
    }
)