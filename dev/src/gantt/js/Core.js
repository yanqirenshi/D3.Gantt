import Asshole from '@yanqirenshi/assh0le';

import Stylist from './Stylist.js';

export default class Core extends Asshole{
    constructor (params) {
        super(params);

        this.stylist = new Stylist();
    }
    drawStage (place, data) {
        place.selectAll("rect.stage")
            .data([data.stage])
            .enter()
            .append("rect")
            .attr("class", 'stage')
            .attr("x", d => d.location().x)
            .attr("y", d => d.location().y)
            .attr("width", d => d.size().w)
            .attr("height", d => d.size().h)
            .attr("fill", d => d.style.background);
    }
    drawHead (place, data) {
        place.selectAll("rect.head")
            .data([data.head])
            .enter()
            .append("rect")
            .attr("class", 'head')
            .attr("x", d => d.location().x)
            .attr("y", d => d.location().y)
            .attr("width", d => d.size().w)
            .attr("height", d => d.size().h)
            .attr("fill", d => d.style.background);
    }
    drawHeadGrit (place, data) {}
    drawCell (place, data) {
        place.selectAll("rect.timescale")
            .data(data.timescale)
            .enter()
            .append("rect")
            .attr("class", 'timescale')
            .attr("x", d => d.location().x)
            .attr("y", d => d.location().y)
            .attr("width", d => d.size().w)
            .attr("height", d => d.size().h)
            .attr("fill", d => d.style.background);
    }
    drawBody (place, data) {
        place.selectAll("rect.body")
            .data([data.body])
            .enter()
            .append("rect")
            .attr("class", 'body')
            .attr("x", d => d.location().x)
            .attr("y", d => d.location().y)
            .attr("width", d => d.size().w)
            .attr("height", d => d.size().h)
            .attr("fill", d => d.style.background);
    }
    drawBodyGrit (place, data) {}
    drawFoot (place, data) {
        place.selectAll("rect.foot")
            .data([data.foot])
            .enter()
            .append("rect")
            .attr("class", 'foot')
            .attr("x", d => d.location().x)
            .attr("y", d => d.location().y)
            .attr("width", d => d.size().w)
            .attr("height", d => d.size().h)
            .attr("fill", d => d.style.background);
    }
    drawRows (place, data) {
        place.selectAll("rect.row")
            .data(data.wbs.list)
            .enter()
            .append("rect")
            .attr("class", 'row')
            .attr("x", d => d.location().x)
            .attr("y", d => d.location().y)
            .attr("width", d => d.size().w)
            .attr("height", d => d.size().h)
            .attr("fill", d => d.style.background);
    }
    drawChart (place, data) {
        place.selectAll("rect.chart")
            .data(data.workpackages.list)
            .enter()
            .append("rect")
            .attr("class", 'chart')
            .attr("x", d => d.location().x)
            .attr("y", d => d.location().y)
            .attr("width", d => d.size().w)
            .attr("height", d => d.size().h)
            .attr("rx", d => d.size().h/2)
            .attr("ry", d => d.size().h/2)
            .attr("fill", d => d.style.background);
    }
    draw (data) {
        const place = this.getLayerForeground();
        this.drawStage(place, data);

        this.drawHead(place, data);
        this.drawBody(place, data);
        this.drawFoot(place, data);

        this.drawCell(place, data);
        this.drawRows(place, data);

        this.drawBodyGrit(place, data);
        this.drawHeadGrit(place, data);

        this.drawChart(place, data);
    }
    data (data) {
        const model = this.stylist.styling(data);

        this.draw(model);

        return this;
    }
}
