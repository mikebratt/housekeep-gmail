/**
 * Housekeeping script for gmail.
 * 
 * Based on this post [link now dead] -> https://www.johneday.com/422/time-based-gmail-filters-with-google-apps-script
 *
 * Usage:
 *  Create a trigger to run Housekeep() to suit your needs
 *  Add a deleteFrom call for each label you wish to housekeep
 *  deletefrom( Label, days_to_keep )
 *
 */

/* global GmailApp */
/* global Utilities */

function Housekeep() {
  deleteFrom("Label1", 7);
  deleteFrom("Label2", 30);
}

function deleteFrom(strLabel, intDays) {
  var maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - intDays);

  var label = GmailApp.getUserLabelByName(strLabel);
  var threads = label.getThreads();
  if (threads !== null) {
    for (var i = 0; i < threads.length; i++) {
      if (threads[i].getLastMessageDate() < maxDate) {
        if (!threads[i].hasStarredMessages() && !threads[i].isImportant()) {
           Logger.log('Moving "%s" to trash',threads[i].getFirstMessageSubject());  
          threads[i].moveToTrash();
          Utilities.sleep(1000);
        }
      }
    }
  }
}
