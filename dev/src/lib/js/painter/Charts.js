export default class Charts {
    drawTextsWithLink (mode, anchers) {
        anchers
            .attr("href", d=> d.url())
            .attr('target', "_blank")
            .attr('rel', "noopener noreferrer");

        if ('enter'===mode)
            this.drawTexts(anchers.append('text'));

        if ('update'===mode)
            this.drawTexts(anchers.select("text"));

    }
    drawTexts (texts) {
        const fontSize = (d) => {
            const h = d._label.size.h;

            return Math.floor((h - (d.style.padding * 2)) * 0.7);
        };

        return texts
            .attr("x", d=> d._label.location.x)
            .attr("y", d=> d._label.location.y)
        // .attr("x", d=> d.location().x + (d.style.padding * 3))
        // .attr("y", d=> d.location().y + d.style.padding + (d.size().h/2) + d.style.padding)
            .attr("font-family", "Verdana")
            .attr("font-size", d=> fontSize(d))
            .text(d=> d.core.name);
    }
    fillColor (d, type) {
        const core_style = d.core.style;
        const style = d.style;

        if (core_style &&
            core_style[type] &&
            core_style[type].background)
            return core_style[type].background;

        return style[type].background;
    }
    drawPlan (rects) {
        rects
            .attr("x", d=> d._plan.location.x)
            .attr("y", d=> d._plan.location.y)
            .attr("width", d=>  d._plan.size.w)
            .attr("height", d=> d._plan.size.h)
            .attr("rx", d=> d._plan.size.h/2)
            .attr("ry", d=> d._plan.size.h/2)
            .attr("fill", d=> this.fillColor(d, 'plan'));
    }
    drawResult (rects) {
        rects
            .attr("x", d=> d._result.location.x)
            .attr("y", d=> d._result.location.y)
            .attr("width", d=>  d._result.size.w)
            .attr("height", d=> d._result.size.h)
            .attr("rx", d=> d._result.size.h/2)
            .attr("ry", d=> d._result.size.h/2)
            .attr("fill", d=> this.fillColor(d, 'result'));
    }
    drawProgress (rects) {
        rects
            .attr("x", d=> {
                return d._progress.location.x;
            })
            .attr("y", d=> d._progress.location.y)
            .attr("width", d=>  d._progress.size.w)
            .attr("height", d=> d._progress.size.h)
            .attr("rx", d=> d._progress.size.h/2)
            .attr("ry", d=> d._progress.size.h/2)
            .attr("fill", d=> this.fillColor(d, 'progress'));
    }
    draw (place, data) {
        const selection = place
              .selectAll("g.chart")
              .data(data.workpackages.list, (wp)=> wp.id);

        // add
        const enterd = selection
              .enter()
              .append("g")
              .attr("class", 'chart');

        const isText = (d)=> d.url() ? false : true;
        const isTextWithLink = (d)=> d.url() ? true  : false;
        const eqWp = (wp)=> wp.id;

        this.drawResult(enterd.filter(d=> d._result.size.w>0).append("rect").attr("class", 'result'));
        this.drawPlan(enterd.append("rect").attr("class", 'chart'));
        this.drawProgress(enterd.filter(d=> d._progress.size.w>0).append("rect").attr("class", 'progress-chart'));
        this.drawTexts(enterd.filter(isText).append("text").attr("class", 'chart'));
        this.drawTextsWithLink('enter', enterd.filter(isTextWithLink).append("a"));

        // update
        const workpackages = data.workpackages.list;
        this.drawResult(selection.filter(d=> d._result.size.w>0).selectAll("rect.result").data(workpackages, eqWp));
        this.drawPlan(selection.selectAll("rect.chart").data(workpackages, eqWp));
        this.drawProgress(selection.filter(d=> d._progress.size.w>0).selectAll("rect.progress-chart").data(workpackages, eqWp));

        this.drawTexts(
            selection
                .filter(isText)
                .selectAll("text.chart")
                .data(workpackages, eqWp));

        this.drawTextsWithLink(
            'update',
            selection
                .filter(isTextWithLink)
                .selectAll("a")
                .data(workpackages, eqWp));

        // delete
        selection.exit().remove();
    }
}
