import Asshole from '@yanqirenshi/assh0le';

import Stylist from './Stylist.js';

export default class D3Gantt extends Asshole{
    constructor () {
        super();
        this.stylist = new Stylist();
    }
    drawStage (place, data) {
        place.selectAll("rect.stage")
            .data([data.stage])
            .enter()
            .append("rect")
            .attr("class", 'stage')
            .attr("x", d => d.location.x)
            .attr("y", d => d.location.y)
            .attr("width", d => d.size.w)
            .attr("height", d => d.size.h)
            .attr("fill", "#aaaaaa");
    }
    drawHead (place, data) {
        place.selectAll("rect.head")
            .data([data.head])
            .enter()
            .append("rect")
            .attr("class", 'head')
            .attr("x", d => d.location.x)
            .attr("y", d => d.location.y)
            .attr("width", d => d.size.w)
            .attr("height", d => d.size.h)
            .attr("fill", "#0aaaaa");
    }
    drawBody (place, data) {
        place.selectAll("rect.body")
            .data([data.body])
            .enter()
            .append("rect")
            .attr("class", 'body')
            .attr("x", d => d.location.x)
            .attr("y", d => d.location.y)
            .attr("width", d => d.size.w)
            .attr("height", d => d.size.h)
            .attr("fill", "#aa0aaa");
    }
    drawFoot (place, data) {
        place.selectAll("rect.foot")
            .data([data.foot])
            .enter()
            .append("rect")
            .attr("class", 'foot')
            .attr("x", d => d.location.x)
            .attr("y", d => d.location.y)
            .attr("width", d => d.size.w)
            .attr("height", d => d.size.h)
            .attr("fill", "#aaaa0a");
    }
    drawRows (place, data) {
        place.selectAll("rect.row")
            .data(data.wbs.list)
            .enter()
            .append("rect")
            .attr("class", 'row')
            .attr("x", d => d.obj.location().x)
            .attr("y", d => d.obj.location().y)
            .attr("width", d => d.obj.size().w)
            .attr("height", d => d.obj.size().h)
            .attr("fill", "#fff");
    }
    drawCell (place, data) {
    }
    draw (data) {
        const place = this.getLayerForeground();
        this.drawStage(place, data);
        this.drawHead(place, data);
        this.drawBody(place, data);
        this.drawFoot(place, data);
        this.drawRows(place, data);
        // this.drawCell(place, data);
    }
    data (data) {
        const model = this.stylist.styling(data);

        this.draw(model);

        return this;
    }
}
