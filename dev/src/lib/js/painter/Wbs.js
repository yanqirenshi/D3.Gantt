import moment from 'moment';

export default class Wbs {
    draw (place, data) {
        const wbs_list = data.wbs.list;

        const selection = place
              .selectAll("g.chart_wbs")
              .data(wbs_list, (wp)=> wp.id);

        // add
        const enterd = selection
              .enter()
              .append("g")
              .attr("class", 'chart_wbs');

        const rects = enterd.append("rect").attr("class", 'chart_wbs');

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


        // update

        // delete
    }
}
