export default {
    functional:true, // 函数式组件 ，只有render方法不能写template
    render(h,context){ // context 就是当前组件的上下文 props slots
        let t = 'h'+context.props.type;
        return <t on-click={()=>context.props.fn()}>{context.slots().default}</t>
    }
}