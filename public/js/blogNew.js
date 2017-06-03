/**
 * Created by Gee on 6/2/2017.
 */
$(document).ready(function() {
    new Vue({
        el: '#app',
        data: {
            shownew: true,
            showaffiliate: false,
            showposts: false,
            newpost: 'new',
            affiliate: 'affiliate',
            posts: 'posts'
        },
        methods: {
            display: function (e) {
                switch(e){
                    case 'new':
                        this.shownew = true;
                        this.showaffiliate = false;
                        this.showposts = false;
                        break;
                    case 'affiliate':
                        this.shownew = false;
                        this.showaffiliate = true;
                        this.showposts = false;
                        break;
                    case 'posts':
                        this.shownew = false;
                        this.showaffiliate = false;
                        this.showposts = true;
                        break;
                }
            }
        }
    });

    /**************** NEW POST ****************************************************************/

    var $title = $('#title');
    var $image = $('#image');
    var $postContent = $('#postContent');

    $('#newPostForm').submit(function () {
        var newPost ={
            title: $title.val(),
            image: $image.val(),
            postContent: $postContent.val()
        };
        var formData = new FormData($(this)[0]);
        $.ajax({
            type: "POST",
            url: '/blog/new',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (newPost){
                console.log(newPost);
            }
        });
        return false;
    });
});