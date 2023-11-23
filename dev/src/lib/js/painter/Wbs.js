import moment from 'moment';

export default class Wbs {
    drawBody (rects) {
        rects
            .attr("x", d=> {
                return d.location().x;
            })
            .attr("y", d=> d.location().y)
            .attr("width",  d=> d.size().w)
            .attr("height", d=> d.size().h)
            // .attr("rx", d=> d.size.h/2)
            // .attr("ry", d=> d.size.h/2)
            .attr("stroke-width", 0.5)
            .attr("stroke","#888")
            .attr("fill", 'rgba(255,255,255,0.1')
        ;
    }
    drawTitle (texts) {
        return texts
            .attr("x", d=> d.location().x + 44)
            .attr("y", d=> d.location().y + 111)
        // .attr("x", d=> d.location().x + (d.style.padding * 3))
        // .attr("y", d=> d.location().y + d.style.padding + (d.size().h/2) + d.style.padding)
            .attr("font-family", "Verdana")
            .attr("font-size", d=> 88)
            .attr("font-weight", d=> 'bold')
            .text(d=> {
                return d.name();
            });
    }
    drawAdd (selection) {
        const enterd = selection
              .enter()
              .append("g")
              .attr("class", 'chart_wbs');

        this.drawBody(enterd
                      .append("rect")
                      .attr("class", 'chart_wbs'));

        this.drawTitle(enterd
                       .append("text")
                       .attr("class", 'chart_wbs'));
    }
    drawUpdate (selection) {
        this.drawBody(selection);

        selection
            .selectAll("text.chart_wbs");
    }
    drawRemove (selection) {
        selection.exit().remove();
    }
    draw (place, data) {
        const wbs_list = data.wbs.list;

        const eq = (wbs)=> wbs.id;

        const selection = place
              .selectAll("g.chart_wbs")
              .data(wbs_list, eq);

        this.drawAdd(selection);
        this.drawUpdate(selection);
        this.drawRemove(selection);
    }
}
