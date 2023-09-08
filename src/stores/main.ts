/* eslint-disable consistent-return */
import { checkMusic, getLyric, getMusicUrl } from '@/service';
import { formateSongsAuthor, getNextIndex, getPrevIndex, getRandomIntInclusive } from '@/utils';
import type { AnyObject } from 'env';
import { cloneDeep, shuffle } from 'lodash';
import { darkTheme } from 'naive-ui';
import { defineStore } from 'pinia';
import state, { type playMode } from './state';

export const useMainStore = defineStore({
  id: 'main',
  state: () => state,
  getters: {
    activeTheme(state) {
      return state.theme === 'dark'
        ? darkTheme
        : null;
    },
    isActiveDarkTheme(state) {
      return state.theme === 'dark';
    },
    likeSongsIndexMap(state) {
      const map:{[key:number]:number} = Object.create(null);
      state.likeSongs.forEach((item:number, index:number) => {
        map[item] = index;
      });
      return map;
    },
    currentPlaySong(state) {
      return state.playList[state.currentPlayIndex];
    },
    playListCount(state) {
      return state.playList.length;
    },
    isDark(state) {
      return state.theme === 'dark';
    }
  },
  actions: {
    toggleTheme() {
      const theme = this.theme ==='dark'
        ? 'light'
        :'dark';
      this.changeTheme(theme);
    },
    changeTheme(theme:'dark' | 'light') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = '';
      }
      // 设置网页的配色方案为dark 
      this.theme = theme;
      localStorage.theme = theme;
    },
    initDocumentTheme() {
      if (this.theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = '';
      }
    },
    setLikeList(data:number[]) {
      this.likeSongs = data;
      localStorage.likeSongs = JSON.stringify(data);
    },
    removeLikeList(id:number) {
      this.likeSongs = this.likeSongs.filter((item: number) => item !== id);
      localStorage.likeSongs = JSON.stringify(this.likeSongs);
    },
    removeAllLikeList() {
      this.likeSongs = [];
      localStorage.likeSongs = JSON.stringify(this.likeSongs);
    },
    addLikeList(id:number) {
      this.likeSongs.push(id);
      localStorage.likeSongs = JSON.stringify(this.likeSongs);
    },
    hasLikeSong(id:number) {
      return !!this.likeSongs[this.likeSongsIndexMap[id]];
    },
    mapSongListAddLike(data:any[]) {
      return data.map((item, index) => {
        if (this.likeSongs) {
          const hasLike = this.hasLikeSong(item.id);
          item.like = hasLike;
        } else {
          item.like = false;
        }
        item.formatAuthor = formateSongsAuthor(item.ar);
        item.key = index;
        return item;
      });
    },
    // 初始化播放 列表
    async initPlayList(
      data:any[], index=0, playListId:string, message='亲爱的, 暂无版权'
    ) {
      // 如果没有获取url, 则获取歌曲url
      console.log('data',data)
      let g=1
      if(data.length==0)
      {
        g=0,
        data=[{
        "name": "Young Again (Radio Edit)",
        "id": 29554109,
        "pst": 0,
        "t": 0,
        "ar": [
            {
                "id": 34994,
                "name": "Hardwell",
                "tns": [],
                "alias": []
            },
            {
                "id": 52331,
                "name": "Chris Jones",
                "tns": [],
                "alias": []
            }
        ],
        "alia": [],
        "pop": 95,
        "st": 0,
        "rt": "",
        "fee": 8,
        "v": 47,
        "crbt": null,
        "cf": "",
        "al": {
            "id": 3046048,
            "name": "Young Again",
            "picUrl": "https://p2.music.126.net/1XNXI-PlmlIQAWSV8MCFxg==/109951163375899858.jpg",
            "tns": [],
            "pic_str": "109951163375899858",
            "pic": 109951163375899860
        },
        "dt": 219631,
        "h": {
            "br": 320000,
            "fid": 0,
            "size": 8787636,
            "vd": -77105,
            "sr": 44100
        },
        "m": {
            "br": 192000,
            "fid": 0,
            "size": 5272599,
            "vd": -74557,
            "sr": 44100
        },
        "l": {
            "br": 128000,
            "fid": 0,
            "size": 3515080,
            "vd": -72943,
            "sr": 44100
        },
        "sq": {
            "br": 1096484,
            "fid": 0,
            "size": 30102865,
            "vd": -77393,
            "sr": 44100
        },
        "hr": null,
        "a": null,
        "cd": "01",
        "no": 2,
        "rtUrl": null,
        "ftype": 0,
        "rtUrls": [],
        "djId": 0,
        "copyright": 2,
        "s_id": 0,
        "mark": 270336,
        "originCoverType": 0,
        "originSongSimpleData": null,
        "tagPicList": null,
        "resourceState": true,
        "version": 47,
        "songJumpInfo": null,
        "entertainmentTags": null,
        "awardTags": null,
        "single": 0,
        "noCopyrightRcmd": null,
        "mst": 9,
        "cp": 1369822,
        "rtype": 0,
        "rurl": null,
        "mv": 353135,
        "publishTime": 1413475200000,
        "like": false,
        "formatAuthor": "Hardwell / Chris Jones",
        "key": 0,
        "url": "http://m801.music.126.net/20230908112657/ce5f7e4823b58d72dc96438dbc98cdc3/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/24069628773/f0e9/1153/4e3b/fec4c2f24df1f169a1a7981e150e312a.flac?id=29554109",
        "lyric": "[00:03.010]When I was a boy\n[00:04.900]I dreamed of a place in the sky\n[00:10.520]Playing in the fields\n[00:12.110]Battling with my shields\n[00:13.930]Bows made out of twine\n[00:15.340]\n[00:17.700]I wish I could see this world again\n[00:23.820]Through those eyes\n[00:25.240]See the child in me\n[00:27.100]In my fantasy\n[00:29.050]Never growing old\n[00:30.270]\n[00:33.210]Will we ever feel young again?\n[00:40.660]Will we ever feel young again?\n[00:48.030]Will we ever feel young again?\n[00:54.840]We wanna feel young\n[00:58.560]We wanna feel young again!\n[01:01.720]\n[01:47.300]When I was a boy,\n[01:48.740]I searched for a world that's unknown\n[01:54.580]All we have is fun\n[01:56.330]Everybody run until the sun goes down\n[01:59.560]\n[02:01.910]I wish I could see this world again\n[02:07.970]Through those eyes\n[02:09.450]See the child in me\n[02:11.210]In my fantasy\n[02:13.110]Never growing old\n[02:14.460]\n[02:17.360]Will we ever feel young again?\n[02:24.690]Will we ever feel young again?\n[02:32.150]Will we ever feel young again?\n[02:39.160]We wanna feel young\n[02:42.890]We wanna feel young again\n",
        "isNotLyric": false,
        "tlyric": "[by:刚叔]\n[00:03.010]当我还是个小男孩的时候\n[00:04.900]我梦到我身处天空中的某处\n[00:10.520]在草地上玩耍\n[00:12.110]用我的盾牌战斗\n[00:13.930]还有麻绳做成的弓箭\n[00:17.700]我期望我能再次见到这个世界\n[00:23.820]透过那些双眼\n[00:25.240]看到我心中的童真\n[00:27.100]在我的幻想中\n[00:29.050]永远不会衰老\n[00:33.210]我们会再次感到童真么？\n[00:40.660]我们会再次感到童真么？\n[00:48.030]我们会再次感到童真么？\n[00:54.840]我们想感到童真\n[00:58.560]我们想再次感到年轻时的力量！\n[01:47.300]当我还是个小男孩的时候\n[01:48.740]我寻找一个未知的世界\n[01:54.580]我们只有欢乐\n[01:56.330]所有人快乐奔跑直到太阳下山\n[02:01.910]我希望我能再次看到这个童真的世界\n[02:07.970]通过哪些眼睛\n[02:09.450]看到我心中的童真\n[02:11.210]在我的幻想中\n[02:13.110]永远不衰老\n[02:17.360]我们会再次感到童真么？\n[02:24.690]我们会再次感到童真么？\n[02:32.150]我们会再次感到童真么？\n[02:39.160]我们想感到童真\n[02:42.890]我们想再次感到年轻时的力量！\n",
        "isLoading": false,
        "nextIndex": 1,
        "prevIndex": 99,
        "primaryColor": "rgb(4,2,3)"
    }]}
      if (!data[index]||!data[index].url) {
        const res = await this.setMusicData({ data, id: data[index].id, index: index });
        if (!res.success) return;
      }
      this.playList = data;
      this.initPlayListPrevAndNextIndex();
     
      localStorage.rawPlayList = JSON.stringify(cloneDeep(this.playList));
      this.currentPlayIndex = index;
      this.playListIdList = [playListId];
      this.currentPlayListId = playListId;
      localStorage.currentPlayIndex = index;
      localStorage.playListIdList = JSON.stringify(this.playListIdList);
      localStorage.playList = JSON.stringify(data);
      localStorage.currentPlayListId = playListId;
      if (this.playMode === 'random') {
        this.shufflePlayList();
      }
    if(g!=0)  this.changePlaying(true);
    },
    resetPlayList() {
      this.playList = [];
      this.playListIdList = [];
      this.currentPlayIndex = 0;
      localStorage.currentPlayIndex = 0;
      localStorage.playList = JSON.stringify(this.playList);
      localStorage.playListIdList = JSON.stringify(this.playList);
      localStorage.currentPlayListId = '';
      this.currentPlayListId = '';
      this.playMode = 'order';
    },
    addPlaylist(list:any[], id:string) {
      this.playList = [...this.playList, ...list];
      this.playListIdList.push(id);
      localStorage.playList = JSON.stringify(this.playList);
    },
    // 切换播放音乐
    async changePlayIndex(index:number, message='亲爱的, 暂无版权') {
      // 如果没有获取url, 则获取歌曲url
      if (!this.playList[index].url) {
        const res = await this.setMusicData(
          this.playList, this.playList[index].id, index, message
        );
        if (!res.success) return { success: false };
      }
      this.currentPlayIndex = index;
      localStorage.currentPlayIndex = index;
      localStorage.playList = JSON.stringify(this.playList);
      this.changePlaying(true);
    },
    // 切换播放模式
    changePlayMode(mode:playMode) {
      this.playMode = mode;
      localStorage.playMode = mode;
      if (mode === 'random') {
        this.shufflePlayList();
      } else {
        const currentPlaySong = cloneDeep(this.currentPlaySong);
        const rawPlayList = JSON.parse(localStorage.rawPlayList) as any[];
        const newCurrentPlayIndex = rawPlayList.findIndex(item => item.id === currentPlaySong.id);
        rawPlayList[newCurrentPlayIndex] = currentPlaySong;
        this.playList = rawPlayList;
        this.initPlayListPrevAndNextIndex();
        this.currentPlayIndex = newCurrentPlayIndex;
        localStorage.currentPlayIndex = this.currentPlayIndex;
        localStorage.playList = JSON.stringify(rawPlayList);
      }
    },
    // 切换播放状态
    changePlaying(playing:boolean) {
      this.playing = playing;
    },
    // 切换下一首
    async toggleNext(index?:number) {
      const resultIndex = this.getNextPlayIndex(index);
      console.log(this.playList[resultIndex].url);
      if (!this.playList[resultIndex].url) {
        const res = await this.setMusicData({ data: this.playList, id: this.playList[resultIndex].id, index: resultIndex });
        // 如果获取失败说明无版权,则获取下一首
        if (!res.success) {
          const nextIndex = getNextIndex(this.currentPlayIndex, this.playListCount - 1);
          this.toggleNext(nextIndex);
          return; 
        }
      }
      this.currentPlayIndex = resultIndex;
      localStorage.currentPlayIndex = resultIndex;
      localStorage.playList = JSON.stringify(this.playList);
      this.changePlaying(true);
      return { success: true };
    },
    // 切换上一首
    async togglePrev(index?:number) {
      const resultIndex = this.getPrevPlayIndex(index);
      if (!this.playList[resultIndex].url) {
        const res = await this.setMusicData({ data: this.playList, id: this.playList[resultIndex].id, index: resultIndex });
        if (!res.success) {
          const prevIndex = getPrevIndex(this.currentPlayIndex, this.playListCount - 1);
          this.togglePrev(prevIndex);
          return;
        }
      }
      this.currentPlayIndex = resultIndex;
      localStorage.currentPlayIndex = resultIndex;
      localStorage.playList = JSON.stringify(this.playList);
      this.changePlaying(true);
      return { success: true };
    },
    // 插入播放
    async insertPlay(value:any) {
      const index = this.playList.findIndex(item => item.id === value.id);
      value.like = this.hasLikeSong(value.id);
      // 未添加则插入
      if (index === -1) {
        this.playList.splice(
          this.currentPlayIndex+1, 0, value
        );
        const insertIndex = this.playList.findIndex((item:any) => item.id === value.id);
        localStorage.playList = JSON.stringify(this.playList);
        this.changePlayIndex(insertIndex);
      } else {
        this.changePlayIndex(index);
      }
    },
    updatePlayListLike(like:boolean, index?:number) {
      const resultIndex = index
        ? index
        : this.currentPlayIndex;
      this.playList[resultIndex].like = like;
      localStorage.playList = JSON.stringify(this.playList);
    },
    async setMusicData(options:{
      data:any[], id:string, index:number, message?:string;
      showMessage?:boolean;
     }):Promise<any> {
      const { data, id, index, message='亲爱的,暂无版权!为你自动跳过此首歌曲', showMessage=true } = options;
      const result:AnyObject={};
      showMessage && window.$message.loading('获取歌曲数据中...', { duration: 0 });
      try {
        // 检查歌曲是否可用
        const checkRes = await checkMusic(id) as any;
        if (!checkRes.musicSuccess && !checkRes?.data?.success) {
          window.$message.destroyAll();
          showMessage && window.$message.info(message);
          return { success: false };
        }
      } catch (error) {
        window.$message.destroyAll();
        showMessage && window.$message.info('亲爱的,暂无版权');
        return { success: false };
      }
      // 获取音乐url
      const res = await getMusicUrl(id);
      if (res.data.code === 200) {
        result.url = res.data.data[0].url + '?id=' + id;
      } else {
        showMessage && window.$message.error('获取歌曲播放地址失败!');
        return { success: false };
      }
      // 获取歌曲歌词
      const lyricRes = await getLyric(id);
      if (res.data.code === 200) {
        result.lyric = lyricRes.data?.lrc?.lyric;
        if (result.lyric.includes('纯音乐，请欣赏') || !result.lyric) {
          result.isNotLyric = true;
        } else {
          result.isNotLyric = false;
        }
        result.tlyric = lyricRes.data?.tlyric?.lyric;
      } else {
        console.log('获取歌词失败');
      }
      result.isLoading = false;
      window.$message.destroyAll();
      showMessage && window.$message.success('获取成功');
      data[index] = {
        ...data[index],
        ...result
      };
      return { success: true };
    },
    getNextPlayIndex(index?:number) {
      const currentPlayIndex = index
        ? +index
        : +this.currentPlayIndex;
      return this.playList[currentPlayIndex].nextIndex;
    },
    getPrevPlayIndex(index?:number) {
      const currentPlayIndex = index
        ? +index
        : +this.currentPlayIndex;
      return this.playList[currentPlayIndex].prevIndex;
    },
    setMySubscribeSongList(list:any[]) {
      this.mySubscribeSongList = list;
      localStorage.mySubscribeSongList = JSON.stringify(list);
    },
    addSearchHistory(value:string) {
      if (this.searchHistory.includes(value)) {
        return;
      }
      this.searchHistory.push(value);
      localStorage.searchHistory = JSON.stringify(this.searchHistory);
    },
    removeSearchHistory(index:number) {
      this.searchHistory.splice(index, 1);
      localStorage.searchHistory = JSON.stringify(this.searchHistory);
    },
    clearSearchHistory() {
      this.searchHistory = [];
      localStorage.searchHistory = JSON.stringify([]);
    },
    setShowMusicDetail(value:boolean) {
      this.showMusicDetail = value;
    },
    toggleShowMusicDetail() {
      this.showMusicDetail = !this.showMusicDetail;
    },
    initPlayListPrevAndNextIndex() {
      const max = this.playListCount-1;
      this.playList.forEach((item, index) => {
        const nextIndex = getNextIndex(index, max);
        const prevIndex = getPrevIndex(index, max);
        item.nextIndex = nextIndex;
        item.prevIndex = prevIndex;
      });
    },
    shufflePlayList() {
      const currentPlaySong = cloneDeep(this.currentPlaySong);
      const shufflePlayList = shuffle(cloneDeep(this.playList));
      const newCurrentPlayIndex = shufflePlayList.findIndex(item => item.id === currentPlaySong.id);
      shufflePlayList.splice(newCurrentPlayIndex, 1);
      shufflePlayList.unshift(currentPlaySong);
      this.playList = shufflePlayList;
      this.initPlayListPrevAndNextIndex();
      this.currentPlayIndex = 0;
      localStorage.currentPlayIndex = 0;
      localStorage.playList = JSON.stringify(shufflePlayList);
    }
  }
});