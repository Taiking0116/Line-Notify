function check-() {
  // 未チェックの値を含むセルの状態を 'checked'に変更します。
  var range = SpreadsheetApp.getActive().getRange('C2:C20');
  range.check();
}

function check_action(){
  //誤送信防止
  //スプレッドシートの定義
  let listSheet = SpreadsheetApp.getActiveSheet();
  const checks = listSheet.getRange(7,5).getValue(); //チェックボックス
  if (checks == true){
    var range = SpreadsheetApp.getActive().getRange('E7');
    range.uncheck();
    sendMessage()
  }else{
    range_comment = listSheet.getRange('E10');  //書き込み先
    range_comment.setValue("確認にチェックを入れてください");
  }
}
function sendMessage(){
   //スプレッドシートの定義
   let listSheet = SpreadsheetApp.getActiveSheet();
   //送信するメッセージを取得
   let message = listSheet.getRange(4,5).getDisplayValue();
   const CLASSs = 1; //クラス
   const MAIL_ADDRESS_COL = 2; //アクセストークンの列番号
   const CHECK = 3; //チェックボックスの列番号
   const START_ROW = 2;        //for構文で読み込み始める最初の行番号
   const listLastRow = 20; //クラスの最後の行番号
   //APIのURL
   const lineNotifyApi = "https://notify-api.line.me/api/notify";

   for (var a=START_ROW; a<=listLastRow; a++){
     const token =  listSheet.getRange(a,MAIL_ADDRESS_COL).getValue(); //アクセストークンを取得
     const check = listSheet.getRange(a,CHECK).getValue(); //チェックボックス
     const cl = listSheet.getRange(a,CLASSs).getValue(); //クラス
     console.log(cl)
     console.log(check)
     const options = {
       "method"  : "post", //POST送信
       "payload" : "message=" + message, //送信するメッセージ
       "headers" : {"Authorization" : "Bearer "+ token}
     }
     if (check == 	true){
       UrlFetchApp.fetch(lineNotifyApi, options);
       range_comment = listSheet.getRange('E10');  //書き込み先
       range_comment.setValue(cl + "組に送信しました");
     }
   }
  reset()
}

function reset(){
  var ranges = SpreadsheetApp.getActive().getRange('C2:C20');
  ranges.uncheck();
  let listSheet = SpreadsheetApp.getActiveSheet();
  range_comment = listSheet.getRange('E10');  //書き込み先
  range_comment.setValue("送信が完了しました。");
}
