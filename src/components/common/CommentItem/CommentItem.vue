<template>
  <div class="comments__item">
                    <div class="comments__writer">
                        <p class="comments__writer--name">{{writer}}</p>
                        <span class="comments__writer--date">{{date}}</span>
                    </div>
                    <div class="comments__description">
                        <p>{{description}}</p>
                    </div>
</div>
</template>

<script>
export default {
props:['writer','date','description']
}
</script>

<style>

</style>