import {Colon} from '@yanqirenshi/assh0le';

import Stylist from './Stylist.js';
import Builder from './Builder.js';

import * as Painter from './painter/index.js';

export default class Rectum extends Colon {
    constructor (params) {
        super({
            layers: [
                { id: 1, code: 'background' },
                { id: 2, code: 'foreground' },
                { id: 3, code: 'canvas' },
            ],
            transform: params.transform,
        });

        this.stylist = new Stylist();
    }
    drawStage (place, data) {
        const draw = (selections)=> {
            selections
                .attr("x", d=> d.location().x)
                .attr("y", d=> d.location().y)
                .attr("width", d=> d.size().w)
                .attr("height", d=> d.size().h)
                .attr("fill", d=> d.style.background);
        };

        const selections = place
              .selectAll("rect.stage")
              .data([data.stage]);

        // update
        draw(selections);

        // add
        draw(selections
             .enter()
             .append("rect")
             .attr("class", 'stage'));

        // delete
        selections.exit().remove();
    }
    drawHead (place, data) {
        const draw = (selection)=> {
            selection
                .attr("x", d=> d.location().x)
                .attr("y", d=> d.location().y)
                .attr("width", d=> d.size().w)
                .attr("height", d=> d.size().h)
                .attr("fill", d=> d.style.background);
        };

        const selections = place
              .selectAll("rect.head")
              .data([data.head]);

        // add
        draw(selections.enter().append("rect").attr("class", 'head'));

        // update
        draw(selections);

        // delete
        selections.exit().remove();
    }
    drawHeadGrit (place, data) {}
    drawCell (place, data) {
        const cells = place
              .selectAll("g.cell")
              .data(data.timescale, (d)=>d.core.start.format('YYYY-MM-DD'));

        const draw = (selection)=> {
            selection
            .attr("x", d=> d.location().x + 22)
            .attr("y", d=> d.location().y + (77))
            .attr("font-family", "Verdana")
            .attr("font-size", d=> 55)
            .text(d=> d.core.start.format('yyyy-MM'));
        };

        const enterd = cells.enter().append("g").attr("class", 'cell');

        // add
        draw(enterd
             .append("text")
             .attr("class", 'chart'));

        // update
        draw(cells
             .selectAll("text.chart")
             .data(data.timescale, (d)=>d.core.start.format('YYYY-MM-DD')));

        // delete
        cells.exit().remove();
    }
    drawBody (place, data) {
        const draw = (selection)=> {
            selection
                .attr("x", d=> d.location().x)
                .attr("y", d=> d.location().y)
                .attr("width", d=> d.size().w)
                .attr("height", d=> d.size().h)
                .attr("fill", d=> d.style.background);
        };

        const selection = place
              .selectAll("rect.body")
              .datum([data.body]);

        // add
        draw(selection.enter().append("rect").attr("class", 'body'));

        // update
        draw(selection.data([data.body]));

        // delete
        selection.exit().remove();
    }
    drawBodyGrid (place, data) {
        const draw = (selection)=> {
            selection
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
        draw(grids.enter().append("line").attr("class", 'grid'));

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
        const draw = (selection)=> {
            selection
                .attr("x", d=> d.location().x)
                .attr("y", d=> d.location().y)
                .attr("width", d=> d.size().w)
                .attr("height", d=> d.size().h)
                .attr("fill", d=> d.style.background);
        };

        const selection = place
              .selectAll("rect.row")
              .data(data.wbs.list, (wbs)=> wbs.id);

        // add
        draw(selection.enter().append("rect").attr("class", 'row'));

        // update
        draw(selection);

        // delete
        selection.exit().remove();
    }
    drawNow (place, data) {
        const draw = (selection)=> {
            selection
                .attr("x1", d=> d.x1)
                .attr("y1", d=> d.y1)
                .attr("x2", d=> d.x2)
                .attr("y2", d=> d.y2)
                .attr("stroke", "#d9333f")
                .attr("stroke-width", 6);
        };

        const selection = place
              .selectAll("line.now")
              .data([data.now],
                   d=> d.x1);

        // add
        draw(selection.enter().append("line").attr("class", 'grid'));

        // update
        draw(selection);

        // delete
        selection.exit().remove();
    }
    draw () {
        const data = this.data();

        const place = this.layer('canvas');

        this.drawStage(place, data);

        this.drawHead(place, data);
        // this.drawBody(place, data);
        // this.drawFoot(place, data);

        this.drawBodyGrid(place, data);
        this.drawHeadGrit(place, data);

        this.drawCell(place, data);
        this.drawRows(place, data);

        new Painter.Wbs().draw(place, data);
        new Painter.Workpackages().draw(place, data);

        this.drawNow(place, data);
    }
    styling (data) {
        return this.stylist.styling(data);
    }
    /* ******** */
    /*  Data    */
    /* ******** */
    data (data) {
        if (arguments.length===0)
            return super.data();

        const builder = new Builder();

        // builder.build(data.wbs, data.workpackages, data.style);

        return super.data(this.styling(data));
    }
}
