export default {
    functional:true,
    props:['render','a'],
    render(h,context){
        return context.props.render(h,context.props.a)
    }
}