export const avatar = 
    "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const Api_options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer '+ import.meta.env.VITE_TMDB_API_KEY,
  }
};

export const image_cdn = 
  "https://image.tmdb.org/t/p/w500/";
   

export const Bg_url = 
  "https://assets.nflxext.com/ffe/siteui/vlv3/cb72daa5-bd8d-408b-b949-1eaef000c377/web/IN-en-20250825-TRIFECTA-perspective_a3209894-0b01-4ddb-b57e-f32165e20a3f_large.jpg"

export const supportedLanguages = [{identifier:"en",name:"English"},
                                  {identifier:"hindi",name:"Hindi"},
                                  {identifier:"spanish",name:"Spanish"},
                                  {identifier:"urdu",name:"Urdu"}
]

export const groqKey = import.meta.env.VITE_GROQ_API_KEY;