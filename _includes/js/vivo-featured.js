<script>
$.getJSON("{{ "/data/subjects.json" | relative_url }}", function(json){
    var subjectTerms = json.subjects.filter(function(x) { return x.count > minSize; });
    var counts = subjectTerms.map(function(obj){ return obj.count; });
    var countMax = counts.reduce(function(a, b) { return Math.max(a, b); });
    var cloud = document.getElementById("cloud");
    /* Fisher-Yates shuffle https://bost.ocks.org/mike/shuffle/ */
    /* function shuffle(array) {
        var m = array.length, t, i;
        while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
        }
        return array;
    } */
    function mapSize(x) { return Math.round(x * 9 / countMax + 1); }
    /* create cloud */
    function makeGrid(array) {
        var i;
        //shuffle(array);
        var item;
        for (i = 0; i < array.length; i++) {
            var size = mapSize(array[i].count)
            item = '<a class="btn btn-outline-secondary m-1 wrd tagcloud' + size + '" href="' + array[i].link + '">' + array[i].subject + '</a>';
            cloud.innerHTML += item;
        }
    }
    makeGrid(subjectTerms);
});
</script>