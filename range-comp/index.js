const _ = (p) => document.querySelector(p);

const setCssVar = (dom, varName, v) => {
    // get variable from wherever
    // getComputedStyle(element).getPropertyValue("--my-var");

    // set variable on inline style
    dom.style.setProperty(varName, v);
};

function Onload(){
    const updateRange1 = (e) => {
        let v = range1.value;
        _('#ltr-wrap1-indicates').innerHTML = v;
        setCssVar(range1.container, '--percent', Math.round(v * 100) + '%');
    };
    let range1 = new RangeComp({
        mode : 'lr',
        container : _('#ltr-wrap1'),
        onDragStart : updateRange1,
        onDragging : updateRange1
    });

    const updateRange2 = () => {
        let v = Math.round(range2.value * 100) + '%';
        _('#ltr-wrap2-indicates').innerHTML = v;
        setCssVar(range2.container, '--percent', v);
    };
    let range2 = new RangeComp({
        // omit mode param
        container : _('#ltr-wrap2'),
        onDragStart : updateRange2,
        onDragging : updateRange2
    });

    const updateRange3 = (e) => {
        let v = range3.value;
        setCssVar(range3.container, '--percent', Math.round(v * 100) + '%');
    };
    let range3 = new RangeComp({
        mode : 'rl',
        container : _('#rtl-wrap1'),
        onDragStart : updateRange3,
        onDragging : updateRange3
    });

    const updateRange4 = (e) => {
        let v = range4.value;
        console.log(v);
        setCssVar(range4.container, '--percent', Math.round(v * 100) + '%');
    };
    let range4 = new RangeComp({
        mode : 'tb',
        container : _('#ttb-wrap1'),
        onDragStart : updateRange4,
        onDragging : updateRange4
    });

    const updateRange5 = (e) => {
        let v = range5.value;
        setCssVar(range5.container, '--percent', Math.round(v * 100) + '%');
    };
    let range5 = new RangeComp({
        mode : 'bt',
        container : _('#btt-wrap1'),
        onDragStart : updateRange5,
        onDragging : updateRange5
    });

    const updateRange6 = (e) => {
        let v = range6.value;
        setCssVar(range6.container, '--percent', Math.round(v * 100) + '%');
    };
    let range6 = new RangeComp({
        mode : 'lr',
        container : _('#ltr-wrap3'),
        onDragStart : updateRange6,
        onDragging : updateRange6
    });
};

window.addEventListener('load', Onload);