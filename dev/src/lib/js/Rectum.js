import {Colon} from '@yanqirenshi/assh0le';

import Stylist from './Stylist.js';

export default class Rectum extends Colon {
    constructor (params) {
        super(params);

        this.stylist = new Stylist();
    }
    drawStage (place, data) {
        const draw = (selections)=> {
            selections
                .attr("class", 'stage')
                .attr("x", d=> d.location().x)
                .attr("y", d=> d.location().y)
                .attr("width", d=> d.size().w)
                .attr("height", d=> d.size().h)
                .attr("fill", d=> d.style.background);
        };

        const selections = place
              .selectAll("rect.stage")
              .data([data.stage]);

        draw(selections);

        draw(selections.enter().append("rect"));

        selections.exit().remove();
    }
    drawHead (place, data) {
        const draw = (selection)=> {
            selection
                .attr("class", 'head')
            .attr("x", d=> d.location().x)
            .attr("y", d=> d.location().y)
            .attr("width", d=> d.size().w)
            .attr("height", d=> d.size().h)
            .attr("fill", d=> d.style.background);
        };

        const selections = place
              .selectAll("rect.head")
              .data([data.head]);

        draw(selections.enter().append("rect"));

        draw(selections);

        selections.exit().remove();
    }
    drawHeadGrit (place, data) {}
    drawCell (place, data) {
        const cells = place
              .selectAll("g.cell")
              .data(data.timescale);

        cells.exit().remove();

        const enterd = cells.enter().append("g").attr("class", 'cell');

        enterd
            .append("text")
            .attr("class", 'chart')
            .attr("x", d=> d.location().x + 22)
            .attr("y", d=> d.location().y + (77))
            .attr("font-family", "Verdana")
            .attr("font-size", d=> 55)
            .text(d=> d.core.start.format('MM月'));

        cells.exit().remove();

        cells
            .selectAll("text.chart")
            .data(data.timescale, (d)=>d.core.start.format('YYYY-MM-DD'))
            .attr("x", d=> d.location().x + 22)
            .attr("y", d=> d.location().y + (77))
            .attr("font-family", "Verdana")
            .attr("font-size", d=> 55)
            .text(d=> d.core.start.format('MM月'));
    }
    drawBody (place, data) {
        const selection = place
              .selectAll("rect.body")
              .datum([data.body]);

        const enterd = selection.enter().append("rect");

        enterd
            .attr("class", 'body')
            .attr("x", d=> d.location().x)
            .attr("y", d=> d.location().y)
            .attr("width", d=> d.size().w)
            .attr("height", d=> d.size().h)
            .attr("fill", d=> d.style.background);

        selection
            .data([data.body])
            .attr("x", d=> d.location().x)
            .attr("y", d=> d.location().y)
            .attr("width", d=> d.size().w)
            .attr("height", d=> d.size().h)
            .attr("fill", d=> d.style.background);
    }
    drawBodyGrid (place, data) {
        const draw = (grids)=> {
            grids
                .attr("class", 'grid')
                .attr("x1", d=> d.location.x)
                .attr("y1", d=> d.location.y)
                .attr("x2", d=> d.location.x)
                .attr("y2", d=> d.location.y + d.size.h)
                .attr("stroke", d=> d.stroke.color)
                .attr("stroke-width", d=> d.stroke.width)
                .attr("stroke-dasharray", d=> d.stroke.dasharray);
        };

        const grids = place
              .selectAll("line.grid")
              .data(data.grid);

        // add
        draw(grids.enter().append("line"));

        // update
        draw(grids);

        // delete
        grids.exit().remove();
    }
    drawFoot (place, data) {
        place.selectAll("rect.foot")
            .data([data.foot])
            .enter()
            .append("rect")
            .attr("class", 'foot')
            .attr("x", d=> d.location().x)
            .attr("y", d=> d.location().y)
            .attr("width", d=> d.size().w)
            .attr("height", d=> d.size().h)
            .attr("fill", d=> d.style.background);
    }
    drawRows (place, data) {
        const selection = place
              .selectAll("rect.row")
              .data(data.wbs.list, (wbs)=> wbs.id);

        const enterd = selection.enter().append("rect").attr("class", 'row');

        enterd
            .attr("x", d=> d.location().x)
            .attr("y", d=> d.location().y)
            .attr("width", d=> d.size().w)
            .attr("height", d=> d.size().h)
            .attr("fill", d=> d.style.background);

        selection
            .attr("x", d=> d.location().x)
            .attr("y", d=> d.location().y)
            .attr("width", d=> d.size().w)
            .attr("height", d=> d.size().h)
            .attr("fill", d=> d.style.background);
    }
    drawChart (place, data) {
        const fontSize = (d) => {
            return Math.floor((d.size().h - (d.style.padding * 2)) * 0.7);
        };

        const drawCharts = (rects)=> {
            rects
                .attr("class", 'chart')
                .attr("x", d=> d.location().x)
                .attr("y", d=> d.location().y)
                .attr("width", d=>  d.size().w)
                .attr("height", d=> d.size().h)
                .attr("rx", d=> d.size().h/2)
                .attr("ry", d=> d.size().h/2)
                .attr("fill", d=> d.style.background);
        };

        const drawTexts = (texts)=> {
            texts
                .attr("class", 'chart')
                .attr("x", d=> d.location().x + (d.style.padding * 3))
                .attr("y", d=> d.location().y + d.style.padding + (d.size().h/2) + d.style.padding)
                .attr("font-family", "Verdana")
                .attr("font-size", d=> fontSize(d))
                .text(d=> d.core.name);
        };

        const selection = place
              .selectAll("g.chart")
              .data(data.workpackages.list, (wp)=> wp.id);

        // add
        const enterd = selection
              .enter()
              .append("g")
              .attr("class", 'chart');

        drawCharts(enterd.append("rect"));
        drawTexts(enterd.append("text"));

        // update
        drawCharts(selection.selectAll("rect").data(data.workpackages.list, (wp)=> wp.id));
        drawTexts(selection.selectAll("text").data(data.workpackages.list, (wp)=> wp.id));

        // delete
        selection.exit().remove();
    }
    drawNow (place, data) {
        const selection = place
              .selectAll("line.now")
              .data([data.now]);

        const enterd = selection.enter().append("line").attr("class", 'grid');

        enterd
            .attr("x1", d=> d.x1)
            .attr("y1", d=> d.y1)
            .attr("x2", d=> d.x2)
            .attr("y2", d=> d.y2)
            .attr("stroke", "#d9333f")
            .attr("stroke-width", 5);

        selection
            .attr("x1", d=> d.x1)
            .attr("y1", d=> d.y1)
            .attr("x2", d=> d.x2)
            .attr("y2", d=> d.y2)
            .attr("stroke", "#d9333f")
            .attr("stroke-width", 5);
    }
    draw () {
        const data = this.data();

        const place = this.layer('foreground');

        this.drawStage(place, data);

        this.drawHead(place, data);
        this.drawBody(place, data);
        this.drawFoot(place, data);

        this.drawCell(place, data);
        this.drawRows(place, data);

        this.drawBodyGrid(place, data);
        this.drawHeadGrit(place, data);

        this.drawNow(place, data);

        this.drawChart(place, data);
    }
    styling (data) {
        return this.stylist.styling(data);
    }
}
