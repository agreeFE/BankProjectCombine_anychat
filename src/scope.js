import EventBus from "$/components/eventBus/eventBus"

export default (ts) => {
    // console.log(ts.props)
    if (ts.props && ts.props.navigation) {
        EventBus.emit('navigatorData',{
            data: ts.props.navigation
        });
    }
    global.__this = ts;
};