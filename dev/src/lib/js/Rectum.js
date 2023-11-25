import {Colon} from '@yanqirenshi/assh0le';

import Stylist from './Stylist.js';

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

        draw(selections);

        draw(selections
             .enter()
             .append("rect")
             .attr("class", 'stage'));

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

        draw(selections.enter().append("rect").attr("class", 'head'));

        draw(selections);

        selections.exit().remove();
    }
    drawHeadGrit (place, data) {}
    drawCell (place, data) {
        const cells = place
              .selectAll("g.cell")
              .data(data.timescale, (d)=>d.core.start.format('YYYY-MM-DD'));

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
    drawCharts (place, data) {
        new Painter.Wbs().draw(place, data);
        new Painter.Workpackages().draw(place, data);
    }
    draw () {
        const data = this.data();

        const place = this.layer('canvas');

        this.drawStage(place, data);

        this.drawHead(place, data);
        this.drawBody(place, data);
        this.drawFoot(place, data);

        this.drawCell(place, data);
        this.drawRows(place, data);

        this.drawBodyGrid(place, data);
        this.drawHeadGrit(place, data);

        this.drawCharts(place, data);

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

        return super.data(this.styling(data));
    }
}
