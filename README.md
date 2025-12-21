# PAL Save Editor

[![CI](https://github.com/chehsunliu/pal-save-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/chehsunliu/pal-save-editor/actions/workflows/ci.yml)

支援軒轅劍和仙劍奇俠傳部份作品存檔修改，不須安裝純為瀏覽器上的靜態網頁操作。

## 使用說明

### 仙劍奇俠傳（DOS 版）

1. 在頁面上方選擇「仙劍奇俠傳」
2. 點擊「輸入」按鈕，選擇你的 `.RPG` 存檔檔案
   - Steam 版（PAL98）：`C:\Program Files (x86)\Steam\steamapps\common\PAL\PAL98\SAVE\0.rpg`
   - Steam 版（DOS）：`C:\Program Files (x86)\Steam\steamapps\common\PAL\PAL_DOS\0.RPG`
3. 修改所需的數值、裝備、仙術或物品
4. 點擊「輸出」按鈕下載修改後的存檔
5. 將下載的檔案覆蓋原本的存檔檔案
6. 如需還原修改，可點擊「重制」按鈕恢復到原始狀態

### 新仙劍奇俠傳

1. 在頁面上方選擇「新仙劍奇俠傳」
2. 點擊「輸入」按鈕，選擇你的 `.sav` 存檔檔案
   - 預設路徑：`C:\Users\<使用者名稱>\OneDrive\Documents\My Games\NewPAL\0.sav`
3. 修改所需的數值、裝備、仙術或物品
4. 點擊「輸出」按鈕下載修改後的存檔
5. 將下載的檔案覆蓋原本的存檔檔案
6. 如需還原修改，可點擊「重制」按鈕恢復到原始狀態

### 軒轅劍外傳 - 楓之舞

1. 在頁面上方選擇「軒轅劍外傳 - 楓之舞」
2. 點擊「輸入」按鈕，選擇你的 `SAVE.ZA1` 存檔檔案
   - Steam 版：`C:\Program Files (x86)\Steam\steamapps\common\SWDA\CHT\SWDA\SAVE\SAVE.ZA1`
3. 修改所需的數值、奇術或物品
4. 點擊「輸出」按鈕下載修改後的存檔
5. 將下載的檔案覆蓋原本的存檔檔案
6. 如需還原修改，可點擊「重制」按鈕恢復到原始狀態

## 注意事項

- 修改存檔前請先備份原始檔案
- 建議在修改前先確認遊戲版本是否與編輯器支援的版本相符
- 某些極端數值可能會導致遊戲異常，請謹慎修改
- 本工具為純前端應用，所有檔案處理均在瀏覽器本地完成，不會上傳任何資料
