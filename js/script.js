const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},

  songs : [
    {
      name: "Até Que Durou",
      singer: "Péricles",
      path: "./music/AtéQueDurou.mp3",
      image: "./image/atequedurou.jpeg"
    },
    {
      name: "Céu Azul",
      singer: "Charlie Brown Jr",
      path: "./music/Charlie Brown Jr - Céu Azul.mp3",
      image: "./image/ceuazul.jpg"
    },
    {
      name: "Paradise",
      singer: "Coldplay",
      path: "./music/Coldplay_Paradise.mp3",
      image: "./image/paradise.jpeg"
    },
    {
      name: "The Scientist",
      singer: "Coldplay",
      path: "./music/Coldplay_The Scientist.mp3",
      image: "./image/The Scientist.jpeg"
    },
    {
      name: "That's My Way",
      singer: "Edi Rock e Seu Jorge",
      path: "./music/Edi Rock e Seu Jorge - That's My Way.mp3",
      image: "./image/MyWay.jpeg"
    },
    {
      name: "Fulminante",
      singer: "Mumuzinho ",
      path: "./music/Fulminante.mp3",
      image: "./image/Fulminante.jpeg"
    },
    {
      name: "Melhor Eu Ir",
      singer: "Péricles",
      path: "./music/Melhor Eu Ir.mp3",
      image: "./image/MelhoEuIr.jpeg"
    },
    {
      name: "Pangeia (Clipe Oficial)",
      singer: "Fabio Brazza",
      path: "./music/Pangeia (Clipe Oficial).mp3",
      image: "./image/Pangeia.jpeg"
    },
    {
      name: "Nem de Graça",
      singer: "Pixote",
      path: "./music/Pixote - Nem de Graça .mp3",
      image: "./image/nemdegraça.jpeg"
    },
    {
      name: "Indomável",
      singer: "Grego",
      path: "./music/Grego Indomável .mp3",
      image: "./image/grego.png"
    },
    {
      name: "Zero Apego",
      singer: "Grego-Paulo Pires",
      path: "./music/Grego, Paulo Pires Apego .mp3",
      image: "./image/grego1.png"
    },
    {
      name: "In The End",
      singer: "Grego-Paulo Pires",
      path: "./music/In The End.mp3",
      image: "./image/link.jpeg"
    },
    {
      name: "Paint In Black",
      singer: "The Rolling Stones",
      path: "./music/The_Rolling_Stones_-_Paint_It_Black_(ColdMP3.com).mp3",
      image: "./image/paint_in_black.png"
    },
    {
      name: "Come as you are",
      singer: "Nirvana",
      path: "./music/Nirvana_-_Come_As_You_Are_(BornMP3.com).mp3",
      image: "./image/come_as_you_are.png"
    },
    {
      name: "Burn it Down",
      singer: "Link Park",
      path: "./music/Linkin_Park_-_BURN_IT_DOWN_(ColdMP3.com).mp3",
      image: "./image/burn_it_down.png"
    },
    {
      name: "The Trooper",
      singer: "Iron Maiden",
      path: "./music/Iron_Maiden_-_The_Trooper_1998_Remastered_Version_1998_Remastered_Version_(ColdMP3.com).mp3",
      image: "./image/the_trooper.png"
    },
    {
      name: "The Kids Aren´t Alright",
      singer: "The Offspring",
      path: "./music/The_Offspring_-_The_Kids_Aren_t_Alright_(ColdMP3.com).mp3",
      image: "./image/the_kids_aren´t_alright.png"
    },
    {
      name: "Iron Man",
      singer: "Black Sabbath",
      path: "./music/Black_Sabbath_-_Iron_Man_(ColdMP3.com).mp3",
      image: "./image/iron_man.png"
    },
    {
      name: "Eye of the Tiger",
      singer: "Survivor",
      path: "./music/Survivor_-_Eye_of_the_Tiger_(ColdMP3.com).mp3",
      image: "./image/eye_of_the_tiger.png"
    },
    {
      name: "Carry on Wayward Son",
      singer: "Kansas",
      path: "./music/Kansas_-_Carry_On_Wayward_Son_(ColdMP3.com).mp3",
      image: "./image/carry_on_wayward_son.png"
    },
    {
      name: "Tornado Of Souls",
      singer: "Megadeth",
      path: "./music/Megadeth_-_Tornado_Of_Souls_(ColdMP3.com).mp3",
      image: "./image/tornado_of_souls.png"
    },
    {
      name: "The house of rising sun",
      singer: "The Animals",
      path: "./music/The_Animals_-_The_House_of_the_Rising_Sun_(ColdMP3.com).mp3",
      image: "./image/house_of_the_rising_sun.png"
    }
  ],

  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();