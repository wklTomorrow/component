## 常用命令指南

---

> 常用命令指南

## 视频处理

- 转换视屏格式
  - `ffmpeg -i input.mp4 output.avi`
  - 这会将 MP4 文件转换为 AVI 文件，其中 input.mp4 是输入文件名，output.avi 是输出文件名。
- 剪辑视屏
  - `ffmpeg -i input.mp4 -ss 00:00:10 -t 00:00:20 -c copy output.mp4`
  - 这会从视频的第 10 秒始，剪辑 20 秒的视频。 -c copy 参数表示使用相同的编解码器。
- 剪切视频
  - `ffmpeg -i input_video.mp4 -ss 00:01:00 -to 00:02:00 -c copy output_video.mp4`
  - 会从视频文件中剪切 1 分钟到 2 分钟的部分，并保存为 MP4 文件。其中 -ss 指定了剪切起始时间，-to 指定了剪切结束时间，-c 指定了复制匹配编解码器的原始视频流。
- 合并视频文件
  - `ffmpeg -i input1.mp4 -i input2.mp4 -filter_complex "[0:v] [0:a] [1:v] [1:a] concat=n=2:v=1:a=1" -c:v libx264 -c:a aac -movflags +faststart output.mp4`
  - 这会将 input1.mp4 和 input2.mp4 文件合并为 output.mp4 文件。 -filter_complex 参数用于指定视频合成器，-c:v 和 -c:a 则指定输出编解码器。
- 压缩视频
  - `ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4`
  - 这会将视频压缩为更小的文件。-c:v 指定视频编解码器，-crf 控制输出视频质量和文件大小，-c:a 指定音频编解码器 -b:a 则设置音频比特率。
- 提取无声视频
  - `ffmpeg -i input.mp4 -an -vcodec copy output.mp4`
  - -an 表示禁用音频流，-vcodec copy 表示直接复制视频流到输出文件中
- 提取音频
  - `ffmpeg -i output/work3.mp4 -acodec libmp3lame -ab 192k output.mp3`
  - -i 参数指定输入文件名称为 input.mp4，-acodec libmp3lame 将音频编码为 MP3 格式并使用 LAME 编码器，-ab 192k 指定输出 MP3 文件的比特率为 192 kb/s
- 变速播放
  - `ffmpeg -i input.mp4 -filter:a "atempo=2.0" -vn output.mp3`
  - 这会将音频加速到原始速度的两倍。-filter:a 参数指定音频过滤器，atempo 标志表示调整播放速度。
- 添加字幕
  - `ffmpeg -i input.mp4 -i subtitles.ass -c:v copy -c:a copy -c:s mov_text output.mp4`
  - 这会将 ASS 字幕文件添加到您的 MP4 视频文件中。
- 将视频变为 Gif
  - `ffmpeg -i input.mp4 -vf "scale=-1:480,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 output.gif`
  - 这会将视频转换为 GIF 文件。-vf 参数指定用于处理视频的过滤器。该命令将视频缩放并生成调色板，之后将调色板应用于转换后的 GIF 文件。
- 给视频添加水印
  - `ffmpeg -i input.mp4 -i watermark.png -filter_complex "overlay=x=main_w-overlay_w-10:y=main_h-overlay_h-10" output.mp4`
  - 这会将 watermark.png 图像添加到 input.mp4 文件的右下角。-filter_complex 参数指定处理视频的复杂过滤器。
- 对视频进行裁剪
  - `ffmpeg -i input.mp4 -filter:v "crop=320:240:50:50" output.mp4`
  - 这会将视频裁剪为 320 x 240 大小，去掉左侧 50 像素和顶部 50 像素。-filter:v 参数指定视频过滤器。
- 从视频中提取帧
  - `ffmpeg -i input.mp4 -vf "select=eq(n\,100)" -vframes 1 output.png`
  - 这会提取视频的第 100 帧，转换为 PNG 图像。-vf 参数指定视频过滤器，-vframes 参数指定提取帧的数量。
- 将多个音频转换为单个文件
  - `ffmpeg -i "concat:input1.mp3|input2.mp3|input3.mp3" -acodec copy output.mp3`
  - 这会将三个 MP3 文件合并为单个 MP3 文件。concat 参数指定文件连接器。
- 给视频添加马赛克
  - `ffmpeg -i input.mp4 -filter_complex "[0:v]boxblur=luma_radius=5:luma_power=1" output.mp4`
  - 我们使用 boxblur 滤镜来对视频进行模糊处理。您可以调整 luma_radius 和 luma_power 参数来更改模糊效果。
- 通过替换像素来去除马赛克
  - `ffmpeg -i input.mp4 -filter_complex "[0:v]dilation[one];[one]dilation[two];[two]dilation[three];[three]neighbor[output]" output.mp4`
  - 我们使用滤镜对三个帧进行膨胀，然后对整个序列进行邻域滤波以平滑去除马赛克
- 在视频中的特定区域添加马赛克
  - `ffmpeg -i input.mp4 -filter_complex "[0:v]drawbox=100:100:200:200:fill=black@0.8:enable='between(t\,0\,10)'[bg];[bg]boxblur=10[blurred];[0:v][blurred]overlay=100:100:enable='between(t\,0\,10)'" output.mp4`
  - 在上述示例中，我们使用 drawbox 和 boxblur 将视频中的 (100, 100) 到 (200, 200) 区域模糊处理，并设置马赛克持续时间为前 10 秒。
- 去除视频水印
  - `ffmpeg -i input.mp4 -i watermark.png -filter_complex "overlay=overlay_x:overlay_y" -codec:a copy output.mp4`
  - input.mp4 是源视频，watermark.png 是您要删除的水印，overlay_x 和 overlay_y 是水印在视频框中的坐标。您需要调整这些位置以准确地隐藏水印
- 截取视频某一帧的图
  - `ffmpeg -i input.mp4 -ss 00:00:01.000 -vframes 1 output.png`
  - ffmpeg：调用 ffmpeg 程序。
  - -i input.mp4：指定要截取帧的视频文件名。
  - -ss 00:00:01.000：指定您要截取的帧所在的时间偏移量。在这个例子中，我们选择了视频的第一秒。
  - -vframes 1：指定只截取一帧图像。
  - output.png：指定输出文件名和其类型，这里是 PNG 类型的图像文件。
- 去除视频中的水印
  - `ffmpeg -i input.mp4 -vf "delogo=x=50:y=640:w=180:h=60:show=0" -c:a copy output.mp4`
  - 视频水印坐标为 50， 640， 水印宽高：180，50
  - delogo=x=760:y=460:w=180:h=60:show=0
- 给视频添加音频
  - `ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 output.mp4`
  - -map 0:v:0 和 -map 1:a:0 分别表示选择输入文件中的第一个视频流和第一个音频流。如果您的音频文件中包含多个音频流，您需要通过过滤器来为 ffmpeg 指定正确的音频流
  <!-- - 在视频的特定位置添加音频
  - `ffmpeg -i input.mp4 -i audio.mp3 -filter_complex "[1:a]afade=t=in:ss=10:d=3,afade=t=out:st=13:d=3[fade];[0:a][fade]amix=inputs=2[a]" -map [0:v] -map "[a]" -c:v copy -c:a mp3 -q:a 0 output.mp4`
  - 该命令将在输入视频 input.mp4 的第 10 秒开始添加音频 audio.mp3，时长为 3 秒。afade 过滤器在音频开头和结尾应用淡入淡出效果，amix 过滤器将音频混合到视频中。-map [0:v] 表示将视频映射到输出文件中，-map "[a]" 表示将音频映射到输出文件中。-c:v copy 表示将视频直接复制到输出文件中，而不需要进行额外的编码，-c:a mp3 -q:a 0 表示将音频编码为 MP3 格式，并将音频质量设置为最高。最后，输出结果保存为 output.mp4 文件。 -->

---

## 音频处理

- 从 MP3 文件中截取前 30 秒
  - `ffmpeg -ss 00:00:00 -i input_audio.mp3 -t 00:00:30 -c copy output_audio.mp3`
  - 会从 input_audio.mp3 文件中截取前 30 秒音频，并将其保存为 output_audio.mp3 文件。-c copy 选项会将音频流进行直接复制，加速了整个过程。
- 从 MP3 文件中截取从第 30 秒开始的后 15 秒
  - `ffmpeg -ss 00:00:30 -i input_audio.mp3 -t 00:00:15 -c copy output_audio.mp3`
  - 会从 input_audio.mp3 文件的第 30 秒处开始截取 15 秒的音频，并将其保存为 output_audio.mp3 文件。

---

## 图片生成视频

- 单张图片生成视频
  - `ffmpeg -loop 1 -i image.jpg -t 5 -r 30 output.mp4`
  - -loop 1 表示循环播放该图片，-i image.jpg 表示输入文件为图片文件 image.jpg，-t 5 表示视频时长为 5 秒，-r 30 表示帧率为 30 帧每秒，output.mp4 是输出的视频文件名称。
- 多张图片生成视频
  - `ffmpeg -framerate 30 -i image_%04d.jpg -vf "scale=1920:-2" -c:v libx264 -preset slow -tune stillimage -crf 18 output.mp4`
  - -framerate 30 表示视频帧率为 30 帧每秒，-i image\_%04d.jpg 表示输入文件为以 image_0001.jpg 开始，帧号后四位，文件类型为“.jpg”的一系列图片文件。-vf "scale=1920:-2" 表示将图片缩放到宽度为 1920 像素，高度根据比例自适应。
  - -c:v libx264 表示视频编码格式为 H.264 标准，-preset slow 和 -tune stillimage 表示编码速度和质量优化，-crf 18 表示视频质量设置（范围一般在 18-28 之间）
- 多张不是一种名称的图片需要转换为视频
  - `ffmpeg -framerate 30 -i image001.jpg image002.jpg image003.jpg -r 30 -s 1920x1080 output.mp4`
  - 将使用图像 image001.jpg、image002.jpg 和 image003.jpg 创建一个帧速率为 30 帧每秒的 1080p 视频

---

## 录制屏幕

- 录制屏幕
  - `ffmpeg -f avfoundation -i "1" -r 30 -preset ultrafast output/luzhi.mp4`
  - -f avfoundation 选项指定 Mac 上的音视频框架，-i "1" 指定录制的屏幕（"1" 表示主屏幕，"2" 表示次屏幕），-r 选项指定帧速率，-preset 选项指定编码器的预设速度。
  - 按下 Ctrl+C 组合键以停止录制。
- 录制屏幕的清晰度
  - `ffmpeg -f avfoundation -i "1" -s 1920x1080 -r 30 -c:v libx264 -preset ultrafast -crf 18 output.mp4`
  - -s 选项指定视频分辨率为 1920x1080 像素，-c:v libx264 指定使用 x264 编码器，-preset ultrafast 指定使用最快的编码器预设，-crf 18 指定输出视频的质量级别。

## 视频切片

- m3u8
  - `ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -ac 2 -f hls -hls_time 10 -hls_list_size 0 output.m3u8`
