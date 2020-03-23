<template>
    <div>
        <h1 v-if="type === 1">
            <slot></slot>
        </h1>
        <h2 v-if="type === 2">
            <slot></slot>
        </h2> 
        <h3 v-if="type === 3">
            <slot></slot>
        </h3> 
        <h4 v-if="type === 4">
            <slot></slot>
        </h4> 
        <h5 v-if="type === 5">
            <slot></slot>
        </h5>   
    </div>
</template>
<script>
export default {
    props:['type']
}
</script>