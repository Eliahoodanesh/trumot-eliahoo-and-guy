import React, { useState, useEffect } from 'react';

export default function AboutEditor() {
  const [aboutContent, setAboutContent] = useState('');

  useEffect(() => {
    // Load the about content from localStorage or backend
    const storedAboutContent = localStorage.getItem('aboutContent') || `ברוכים הבאים לאתר TRUMOT\n\nאנו ב- trumot מתמקדים ביצירת פלטפורמה חברתית ומקוונת המקנה לקהילה הרחבה אפשרות לתרום ציוד שלא בשימוש בבתיהם לאנשים ולמשפחות הזקוקים אליו. נולדנו מתוך הצורך לספק פתרון יעיל ומהימן לאנשים המעוניינים לתרום ולהקנות ציוד, תוך יצירת קשרים חברתיים בין המשתמשים.\n\nמאז תחילת המלחמה, צמח בנו רצון חזק לתת יד לחיילים ולתושבים מפונים ולספק להם ציוד הדרוש להם. אך, נתקלנו בחוסר במערכת מרכזית המאגדת ומקנה פלטפורמה מושלמת לתרומות והעברת הציוד לידי הצרכנים המתאימים. לכן, החלטנו ליצור את trumot - הפלטפורמה שמאפשרת למשתמשים לחלוק ולקבל ציוד בקלות ובפשטות.\n\nהמטרה שלנו היא להקים קהילה שתעזור זו לזו, באמצעות מערכת שיתופית ייחודית. כאן, כל אדם המעוניין לתרום יכול להשתתף במשימה זו בקלות ובנוחות, תוך הבטחת גישה פשוטה ומהימנה לקהל היעד.\n\nאנו מזמינים אתכם להצטרף אלינו במסע חשוב ומשמעותי זה, כדי ליצור יחד קהילה חזקה ומקושרת, המסייעת זו לזו ומביאה שינוי חיובי בחייהם של האחרים.\n\nבברכה, צוות trumot`;
    setAboutContent(storedAboutContent);
  }, []);

  const handleSave = () => {
    // Save the about content to localStorage or backend
    localStorage.setItem('aboutContent', aboutContent);
    console.log('Saving about content:', aboutContent);
  };

  return (
    <div className="container">
      <h2>ערוך אודות</h2>
      <textarea
        className="form-control"
        rows="10"
        value={aboutContent}
        onChange={(e) => setAboutContent(e.target.value)}
      />
      <button className="btn btn-primary mt-3" onClick={handleSave}>שמור</button>
    </div>
  );
}
