import moment from 'moment';

export default class Wbs {
    drawBody (rects) {
        rects
            .attr("x", d=> d.location().x)
            .attr("y", d=> d.location().y)
            .attr("width",  d=> d.size().w)
            .attr("height", d=> d.size().h)
            .attr("stroke-width", 0.5)
            .attr("stroke","#888")
            .attr("fill", 'rgba(255,255,255,0.1');
    }
    drawTitle (texts) {
        return texts
            .attr("x", d=> d.location().x + 44)
            .attr("y", d=> d.location().y + 111)
            .attr("font-family", "Verdana")
            .attr("font-size", d=> 88)
            .attr("font-weight", d=> 'bold')
            .text(d=> d.name());
    }
    drawAdd (selection) {
        const enterd = selection
              .enter()
              .append("g")
              .attr("class", 'chart_wbs');

        this.drawBody(enterd.append("rect"));
        this.drawTitle(enterd.append("text"));
    }
    drawUpdate (selection) {
        this.drawBody(selection);

        this.drawBody(selection.selectAll("rect.chart_wbs"));
        this.drawTitle(selection.selectAll("text.chart_wbs"));
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
