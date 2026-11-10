from pathlib import Path
import base64,re,json
root=Path(__file__).parent
html=(root/'index.html').read_text(encoding='utf-8')
css=(root/'styles.css').read_text(encoding='utf-8')
css=re.sub(r"@import url\('[^']+'\);\s*",'',css,count=1)
js=(root/'script.js').read_text(encoding='utf-8')
html=html.replace('<link rel="stylesheet" href="styles.css" />',f'<style>\n{css}\n</style>')
html=html.replace('<script src="script.js" defer></script>','')
for asset in (root/'assets').glob('*.svg'):
 data=base64.b64encode(asset.read_bytes()).decode()
 html=html.replace(f'assets/{asset.name}',f'data:image/svg+xml;base64,{data}')
asset_map={asset.name: 'data:image/svg+xml;base64,'+base64.b64encode(asset.read_bytes()).decode() for asset in (root/'assets').glob('menu-*.svg')}
asset_script='<script>window.__LEAF_ASSETS__ = '+json.dumps(asset_map)+';</script>'
html=html.replace('</body>',asset_script+f'<script>\n{js}\n</script>\n</body>')
(root/'leaf-cafe-standalone.html').write_text(html,encoding='utf-8')
print('standalone generated', (root/'leaf-cafe-standalone.html').stat().st_size)
