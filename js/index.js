// $(document).ready(function(e)
// {
//     $("#download").click(function(e)
//     {
//         e.preventDefault();

//         //Validations for url
//         function isUrlValid(url)
//         {
//             return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
//         }

//         if($('#url').val().length>0)
//         {
//             if($('#url').val().trim()=='')
//             {
//                 alert('Enter URL');
//                 $('#url').focus();
//                 return;
//             }
//         }
//         else
//         {
//             alert('Enter URL');
//             $('#url').focus();
//             return;
//         }

//         var url = $('#url').val();

//         console.log(url);

//         if(isUrlValid(url))
// 		{
//             console.log('ins');

            
//         }
//         else
//         {
//             console.log('Check URL again...');
//             alert('Check URL again...');
//         }
//     });
// })


// function GetInstagramVideo()
// {
//     var video_dom = document.querySelector("meta[property='og:video:secure_url']");
//     var video_url = "";
//     if (video_dom)
//     {
//         video_url = video_dom.getAttribute("content");
//     }
//     if (!ValidURL(video_url))
//     {
//         video_dom = document.querySelector("meta[property='og:video']");
//         if (video_dom)
//         {
//             video_url = video_dom.getAttribute("content");
//         }
//     }
//     return video_url;
// }


const _ = e => document.querySelector(e);
const render = _('.result');


// create video
const createVideo = data => {
  let v = document.createElement('video');
  v.id = "instavideo";
  v.src = data.content; 
  v.controls = true;
  v.autoplay = true;

  // create info
  let info = document.createElement('p');
  info.textContent = "Click the right button on video and select save as.";

  render.innerHTML = ""; 
  render.appendChild(v);
  render.appendChild(info);
};
// create image
const createImg = data => {
  // create image
  let i = document.createElement('img');
  i.id = "instaImg";
  i.src = data.content;

  // create info
  let info = document.createElement('p');
  info.textContent = "Click the right button on the image and select save image..";

  render.innerHTML = ""; 
  render.appendChild(i);     
  render.appendChild(info); 

};

// extract html
const getMedia = () => {
  render.innerHTML = "<div class='image-placeholder'></div>";
  // get input value
  let url = _('input').value;
  if (url) {
    fetch(url).
    then(r => r.text()).
    then(r => {
      // render html
      render.innerHTML = r;
      // wait, find meta and create video or image
      let w = setTimeout(() => {
        let v = _('meta[property="og:video"]');
        if (v) {
          createVideo(v);
        } else {
          let img = _('meta[property="og:image"]');
          if (img) {
            createImg(img);
          } else {
            document.body.innerHTML = body;
            alert('Error extracting Instagram image / video.');
          };
        }
        clearTimeout(w);
      }, 200);
    });
  } else {
    _('input').setAttribute('placeholder', 'Invalid address, use a proper Insagram link');

  }
};