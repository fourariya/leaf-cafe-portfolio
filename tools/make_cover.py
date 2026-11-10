"""Compose the Fastwork gallery cover from screenshots/leaf-cafe-desktop.png and -mobile.png.

Needs Pillow (pip install pillow inside a project .venv). Output: screenshots/leaf-cafe-fastwork-cover.png
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
p=Path(__file__).resolve().parent.parent

def find_font(*candidates):
    """Return the first font file that exists (Windows, then Linux paths)."""
    for c in candidates:
        if Path(c).exists():
            return c
    raise SystemExit(f"No usable font found among: {candidates}")
W,H=1600,900
img=Image.new('RGB',(W,H),'#eff2e8')
d=ImageDraw.Draw(img)
# editorial background
d.ellipse((1040,-430,1980,510),fill='#d7e6c7')
d.ellipse((-280,600,700,1550),fill='#e2e8d4')
# Upper typography
bold=find_font('C:/Windows/Fonts/segoeuib.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
regular=find_font('C:/Windows/Fonts/segoeui.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
font_title=ImageFont.truetype(bold,58)
font_small=ImageFont.truetype(bold,16)
font_sub=ImageFont.truetype(regular,22)
d.text((92,52),'LEAF CAFÉ',font=font_title,fill='#204532')
d.text((94,132),'RESPONSIVE WEBSITE   /   TH + EN   /   INTERACTIVE DEMO',font=font_small,fill='#77945e')
d.rounded_rectangle((1282,65,1512,108),radius=22,fill='#274d38')
d.text((1311,78),'PORTFOLIO DEMO',font=ImageFont.truetype(bold,13),fill='#f6f9e9')
# desktop shadow
shadow=Image.new('RGBA',(W,H),(0,0,0,0));sd=ImageDraw.Draw(shadow)
sd.rounded_rectangle((74,186,1217,862),radius=28,fill=(33,63,42,70))
shadow=shadow.filter(ImageFilter.GaussianBlur(28));img=Image.alpha_composite(img.convert('RGBA'),shadow)
d=ImageDraw.Draw(img)
d.rounded_rectangle((83,181,1198,843),radius=25,fill='#fffdf5')
d.rounded_rectangle((84,181,1197,220),radius=25,fill='#f8f9f2')
d.rectangle((84,202,1197,233),fill='#f8f9f2')
for i,c in enumerate(['#eab8b0','#f0cf97','#a3be98']):d.ellipse((107+i*21,197,119+i*21,209),fill=c)
d.rounded_rectangle((400,191,827,211),radius=10,fill='#e9eddf')
d.text((531,193),'leaf-cafe.demo',font=ImageFont.truetype(regular,11),fill='#70836b')
desktop=Image.open(p/'screenshots'/'leaf-cafe-desktop.png').convert('RGB')
desktop=desktop.resize((1088,681),Image.Resampling.LANCZOS)
# crop to the allotted window
desktop=desktop.crop((0,0,1088,608))
mask=Image.new('L',desktop.size,255)
img.paste(desktop,(97,231),mask)
# mobile mockup shadow
shadow=Image.new('RGBA',(W,H),(0,0,0,0));sd=ImageDraw.Draw(shadow)
sd.rounded_rectangle((1214,228,1517,818),radius=50,fill=(25,52,38,77))
shadow=shadow.filter(ImageFilter.GaussianBlur(24));img=Image.alpha_composite(img,shadow);d=ImageDraw.Draw(img)
d.rounded_rectangle((1216,205,1506,804),radius=48,fill='#1c392b')
d.rounded_rectangle((1227,215,1495,794),radius=39,fill='#fffdf8')
mobile=Image.open(p/'screenshots'/'leaf-cafe-mobile.png').convert('RGB').resize((255,553),Image.Resampling.LANCZOS)
# device border small
d.rounded_rectangle((1234,226,1488,785),radius=31,fill='#f8f7ef')
img.paste(mobile,(1234,234))
d.rounded_rectangle((1320,225,1404,237),radius=6,fill='#1c392b')
# lower features
# export
out=p/'screenshots'/'leaf-cafe-fastwork-cover.png'
img.convert('RGB').save(out,optimize=True)
print('cover written:',out)
