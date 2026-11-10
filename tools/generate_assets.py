from pathlib import Path
p=Path(__file__).resolve().parent.parent/'assets'  # tools/ -> project assets/ (overwrites the SVGs)
p.mkdir(exist_ok=True)
hero='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 860" role="img" aria-label="Iced matcha latte illustration with botanical elements">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e4ead0"/><stop offset="1" stop-color="#b8cda9"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#f7fcf0" stop-opacity=".9"/><stop offset=".22" stop-color="#eef9e6" stop-opacity=".12"/><stop offset=".76" stop-color="#f8ffed" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity=".78"/></linearGradient>
<linearGradient id="tea" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#a7c76c"/><stop offset=".46" stop-color="#668d45"/><stop offset="1" stop-color="#345d35"/></linearGradient>
<linearGradient id="milk" x1="0" y1="0" x2=".9" y2="1"><stop stop-color="#faf8e6"/><stop offset=".6" stop-color="#e6e8c8"/><stop offset="1" stop-color="#d6deb7"/></linearGradient>
<linearGradient id="ped" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f9f7e9"/><stop offset="1" stop-color="#dddac7"/></linearGradient>
<linearGradient id="straw" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#f8c2b8"/><stop offset="1" stop-color="#b86065"/></linearGradient>
<filter id="sh"><feGaussianBlur stdDeviation="23"/></filter>
<clipPath id="cup"><path d="M286 247 Q287 229 309 229 L514 229 Q535 229 535 247 L509 675 Q505 706 476 709 L348 709 Q320 706 318 678 Z"/></clipPath>
</defs>
<rect x="12" y="12" width="776" height="836" rx="290" fill="url(#bg)"/>
<path d="M11 398 C83 310 75 159 202 53" fill="none" stroke="#9eb998" stroke-width="4" opacity=".65"/>
<path d="M123 249 C29 230 3 190 16 112 C104 114 138 153 123 249Z" fill="#6c9a73" opacity=".5"/>
<path d="M164 158 C188 55 268 23 325 26 C290 128 234 165 164 158Z" fill="#85ae7c" opacity=".54"/>
<path d="M694 71 C760 141 761 232 788 291" fill="none" stroke="#729b76" stroke-width="5" opacity=".5"/>
<path d="M701 128 C630 88 606 44 624 12 C698 35 739 77 701 128Z" fill="#779e72" opacity=".5"/>
<path d="M721 215 C661 180 618 177 575 204 C646 255 684 260 721 215Z" fill="#85ae7c" opacity=".6"/>
<circle cx="616" cy="231" r="83" fill="#f3f3d9" opacity=".45"/>
<ellipse cx="398" cy="762" rx="268" ry="30" fill="#556e4e" opacity=".25" filter="url(#sh)"/>
<ellipse cx="414" cy="732" rx="279" ry="55" fill="url(#ped)"/>
<path d="M136 729 L137 762 Q413 819 692 762 L693 730 Q411 786 136 729Z" fill="#e6e2d0"/>
<ellipse cx="414" cy="729" rx="278" ry="53" fill="#fcfbef"/>
<path d="M359 174 L450 168 L459 257 L371 259Z" fill="#e5ead2" opacity=".5"/>
<rect x="409" y="119" width="14" height="310" rx="7" transform="rotate(14 416 119)" fill="#d0a782"/>
<g clip-path="url(#cup)">
<rect x="274" y="225" width="275" height="490" fill="url(#milk)"/>
<path d="M285 260 C348 222 381 279 438 252 C479 236 512 242 541 264 L541 433 C492 460 443 437 395 470 C351 493 319 447 284 468Z" fill="url(#tea)"/>
<path d="M283 437 C330 416 356 464 393 451 C461 427 499 444 539 423 L534 468 C478 499 444 478 398 505 C343 527 322 480 286 506Z" fill="#a3bf7b" opacity=".8"/>
<path d="M288 527 C335 490 360 528 406 510 C464 491 500 510 529 485 L526 558 C479 579 446 553 409 583 C355 598 331 560 290 584Z" fill="#e6ead0" opacity=".75"/>
<path d="M300 606 C358 567 388 602 445 586 C490 576 514 585 519 575 L509 699 L316 699Z" fill="#d3dcaf" opacity=".7"/>
<g opacity=".48" fill="#f7f9e4"><rect x="319" y="284" width="72" height="61" rx="13" transform="rotate(18 319 284)"/><rect x="447" y="307" width="69" height="73" rx="14" transform="rotate(-17 447 307)"/><rect x="356" y="382" width="79" height="68" rx="14" transform="rotate(-10 356 382)"/><rect x="439" y="521" width="65" height="67" rx="13" transform="rotate(12 439 521)"/><rect x="339" y="557" width="63" height="66" rx="13" transform="rotate(-15 339 557)"/></g>
<path d="M303 246 Q313 232 330 240 L346 681 Q349 697 363 701" fill="none" stroke="#fff" stroke-width="12" opacity=".38"/>
<path d="M504 240 Q512 278 502 464 Q493 612 485 685" fill="none" stroke="#fff" stroke-width="6" opacity=".26"/>
</g>
<path d="M286 247 Q287 229 309 229 L514 229 Q535 229 535 247 L509 675 Q505 706 476 709 L348 709 Q320 706 318 678 Z" fill="url(#glass)" stroke="#fdfdf3" stroke-width="7" opacity=".79"/>
<ellipse cx="410" cy="233" rx="125" ry="28" fill="#bed08b" stroke="#fffdf5" stroke-width="8"/>
<ellipse cx="408" cy="226" rx="104" ry="16" fill="#729e55"/>
<g fill="#e4f0ce" opacity=".8"><rect x="330" y="202" width="43" height="33" rx="8" transform="rotate(19 330 202)"/><rect x="412" y="208" width="37" height="31" rx="8" transform="rotate(-17 412 208)"/><rect x="459" y="219" width="41" height="25" rx="8" transform="rotate(20 459 219)"/></g>
<ellipse cx="410" cy="709" rx="77" ry="8" fill="#f5f8e6" opacity=".64"/>
<g transform="translate(605 563) rotate(-15)"><ellipse cx="0" cy="74" rx="78" ry="20" fill="#486745" opacity=".2"/><path d="M-33 17 C-73 -40 -18 -78 28 -53 C75 -22 67 37 16 72 C-9 85 -28 59 -33 17Z" fill="url(#straw)"/><path d="M-33 17 C-24 23 -5 33 10 47 M1 -44 C7 -17 18 0 26 16" stroke="#ffe4d4" stroke-width="4" fill="none" opacity=".64"/><path d="M-5 -52 Q-23 -93 -8 -103 Q0 -67 17 -95 Q27 -60 44 -75 Q40 -45 8 -43Z" fill="#537b4f"/></g>
<circle cx="208" cy="607" r="15" fill="#e9f1d2" opacity=".8"/>
<circle cx="669" cy="404" r="11" fill="#e7efcf" opacity=".7"/>
</svg>'''
(p/'hero-matcha.svg').write_text(hero,encoding='utf-8')

def drink(bg,leaf,liquid,milk,cup='tall',extra=''):
 return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 420" role="img"><defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{bg}"/><stop offset="1" stop-color="{leaf}"/></linearGradient>
<linearGradient id="drink" x1="0" y1="0" x2="0" y2="1"><stop stop-color="{liquid}"/><stop offset="1" stop-color="{milk}"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#fff" stop-opacity=".48"/></linearGradient>
<filter id="sh"><feGaussianBlur stdDeviation="10"/></filter>
<clipPath id="cup"><path d="M158 92 Q158 79 173 79 H326 Q342 79 342 93 L323 324 Q320 337 304 338 H197 Q181 337 178 325Z"/></clipPath></defs>
<rect width="500" height="420" rx="26" fill="url(#bg)"/>
<circle cx="110" cy="65" r="100" fill="#fff" opacity=".22"/><circle cx="421" cy="353" r="112" fill="#fff" opacity=".18"/>
<path d="M31 320 C70 258 64 222 97 170 M70 257 C30 241 19 209 36 190 Q86 199 85 254 M91 196 C102 145 146 118 160 113 Q158 170 91 196" stroke="#648668" fill="none" stroke-width="3" opacity=".4"/>
<ellipse cx="252" cy="351" rx="125" ry="23" fill="#4a5140" opacity=".17" filter="url(#sh)"/>
<ellipse cx="248" cy="347" rx="142" ry="27" fill="#faf8f2"/>
<path d="M159 91 Q159 80 175 80 H327 Q339 80 339 91 L322 325 Q320 337 304 338 H197 Q179 337 177 325Z" fill="url(#drink)"/>
<g clip-path="url(#cup)"><rect x="150" y="82" width="200" height="95" fill="{liquid}" opacity=".8"/><path d="M158 160 C203 145 235 184 275 159 Q309 140 342 161 L338 190 C290 212 251 181 213 210 L166 205Z" fill="{milk}" opacity=".65"/>
<g fill="#fff" opacity=".34"><rect x="186" y="122" width="49" height="50" rx="10" transform="rotate(16 186 122)"/><rect x="268" y="123" width="49" height="50" rx="10" transform="rotate(-13 268 123)"/><rect x="219" y="232" width="53" height="55" rx="10" transform="rotate(16 219 232)"/></g></g>
<path d="M158 92 Q158 79 173 79 H326 Q342 79 342 93 L323 324 Q320 337 304 338 H197 Q181 337 178 325Z" fill="url(#glass)" stroke="#fffef6" stroke-width="5" opacity=".85"/>
<ellipse cx="249" cy="83" rx="91" ry="15" fill="{liquid}" stroke="#fafaf1" stroke-width="5"/>
<path d="M176 99 L195 319" stroke="#fff" stroke-width="9" opacity=".3"/>
<path d="M291 15 L273 109" stroke="#9c7857" stroke-width="8" stroke-linecap="round"/>
{extra}</svg>'''
(p/'menu-matcha.svg').write_text(drink('#e7edda','#c4d8b0','#71994c','#e5eac9'),encoding='utf-8')
(p/'menu-strawberry.svg').write_text(drink('#f5e4df','#ecd0c8','#8ca75d','#e6b1af',extra='<ellipse cx="346" cy="326" rx="38" ry="16" fill="#b55d64" transform="rotate(24 346 326)" opacity=".8"/>'),encoding='utf-8')
(p/'menu-coffee.svg').write_text(drink('#e7dacb','#cbb9a2','#875940','#e1c1a0'),encoding='utf-8')

cake='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 420"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ede6dc"/><stop offset="1" stop-color="#d2dfca"/></linearGradient><linearGradient id="slice" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#edf0d5"/><stop offset=".3" stop-color="#afc48b"/><stop offset=".35" stop-color="#f7ead8"/><stop offset=".75" stop-color="#e9ddb8"/><stop offset=".8" stop-color="#99ac78"/><stop offset="1" stop-color="#769360"/></linearGradient><filter id="shadow"><feGaussianBlur stdDeviation="13"/></filter></defs><rect width="500" height="420" rx="26" fill="url(#bg)"/><circle cx="403" cy="72" r="120" fill="#fff" opacity=".17"/><ellipse cx="252" cy="342" rx="169" ry="23" fill="#4a624a" opacity=".2" filter="url(#shadow)"/><ellipse cx="251" cy="335" rx="173" ry="36" fill="#fffdf6"/><ellipse cx="251" cy="330" rx="151" ry="26" fill="#e6e0d0"/><path d="M144 194 L323 154 L382 284 L259 320 L151 292Z" fill="url(#slice)" stroke="#fffbea" stroke-width="4"/><path d="M144 194 L323 154 L382 284 L259 320Z" fill="url(#slice)" opacity=".96"/><path d="M144 194 L261 245 L382 284 L323 154Z" fill="#b1c994"/><path d="M144 194 L261 245 L382 284" fill="none" stroke="#f2f0da" stroke-width="9"/><ellipse cx="274" cy="155" rx="45" ry="22" fill="#f5f0de"/><ellipse cx="274" cy="142" rx="33" ry="15" fill="#fffdf5"/><path d="M264 143 Q260 108 282 101 Q287 133 274 148" fill="#6b9465"/><circle cx="291" cy="130" r="10" fill="#da8984"/><circle cx="319" cy="188" r="4" fill="#749866"/><circle cx="339" cy="214" r="5" fill="#749866"/></svg>'''
(p/'menu-cheesecake.svg').write_text(cake,encoding='utf-8')
croissant='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 420"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f3e9dc"/><stop offset="1" stop-color="#e7d5bd"/></linearGradient><linearGradient id="dough" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e8ba72"/><stop offset=".45" stop-color="#be783e"/><stop offset="1" stop-color="#90532b"/></linearGradient><filter id="sh"><feGaussianBlur stdDeviation="13"/></filter></defs><rect width="500" height="420" rx="26" fill="url(#bg)"/><circle cx="98" cy="55" r="118" fill="#fff" opacity=".19"/><ellipse cx="247" cy="332" rx="178" ry="28" fill="#6c5742" opacity=".21" filter="url(#sh)"/><ellipse cx="246" cy="321" rx="182" ry="41" fill="#fcf8ee"/><path d="M108 276 Q130 210 170 197 Q220 144 274 172 Q347 174 381 262 Q345 304 308 300 Q270 324 240 315 Q202 332 170 302 Q129 312 108 276Z" fill="url(#dough)" stroke="#ab6637" stroke-width="4"/><path d="M147 208 Q175 269 163 302 M205 182 Q229 251 213 316 M272 171 Q290 242 275 313 M344 204 Q335 276 314 296" stroke="#f7cf8b" stroke-width="25" fill="none" opacity=".72"/><path d="M147 208 Q175 269 163 302 M205 182 Q229 251 213 316 M272 171 Q290 242 275 313 M344 204 Q335 276 314 296" stroke="#a66b38" stroke-width="6" fill="none" opacity=".72"/><path d="M108 276 Q126 304 164 301 M337 300 Q375 295 381 262" stroke="#f6d798" stroke-width="15" fill="none" opacity=".8"/></svg>'''
(p/'menu-croissant.svg').write_text(croissant,encoding='utf-8')
cookie='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 420"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e1e9d9"/><stop offset="1" stop-color="#f0e9d9"/></linearGradient><linearGradient id="cookie" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#bad095"/><stop offset="1" stop-color="#799861"/></linearGradient><filter id="sh"><feGaussianBlur stdDeviation="12"/></filter></defs><rect width="500" height="420" rx="26" fill="url(#bg)"/><ellipse cx="247" cy="339" rx="170" ry="25" fill="#4d6447" opacity=".18" filter="url(#sh)"/><ellipse cx="250" cy="325" rx="180" ry="41" fill="#fff9ea"/><g transform="translate(190 223) rotate(-17)"><circle r="93" fill="#6a8758"/><circle r="88" fill="url(#cookie)"/><g fill="#4a6142" opacity=".75"><circle cx="-34" cy="-43" r="10"/><circle cx="27" cy="-38" r="13"/><circle cx="48" cy="25" r="9"/><circle cx="-38" cy="35" r="15"/><circle cx="3" cy="11" r="12"/></g></g><g transform="translate(306 239) rotate(14)"><circle r="84" fill="#7b9565"/><circle r="78" fill="#adc18d"/><g fill="#506d49" opacity=".75"><circle cx="-24" cy="-34" r="12"/><circle cx="33" cy="-18" r="9"/><circle cx="-26" cy="32" r="13"/><circle cx="25" cy="36" r="12"/></g></g></svg>'''
(p/'menu-cookies.svg').write_text(cookie,encoding='utf-8')
interior='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 650"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d6d4b8"/><stop offset="1" stop-color="#bbc7aa"/></linearGradient><linearGradient id="win" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff8e2"/><stop offset="1" stop-color="#d4dac9"/></linearGradient></defs><rect width="780" height="650" rx="38" fill="url(#bg)"/><path d="M0 485 L780 462 L780 650 L0 650Z" fill="#b28f70" opacity=".5"/><path d="M95 50 H612 V453 H95Z" fill="#75896c"/><path d="M115 69 H592 V432 H115Z" fill="url(#win)"/><path d="M357 68 V435 M115 258 H592" stroke="#8d9c7e" stroke-width="15"/><path d="M115 69 L592 69 L592 432" stroke="#eef0d9" stroke-width="9" fill="none" opacity=".7"/><path d="M136 430 Q189 331 276 386 Q342 275 427 366 Q478 320 571 407 L571 430Z" fill="#9db194"/><path d="M135 430 Q196 391 249 412 Q310 365 353 405 Q461 364 575 423" fill="#739270" opacity=".6"/><path d="M80 479 H644 L626 501 H96Z" fill="#705d4f"/><path d="M103 498 H621 V510 H103Z" fill="#605446"/><path d="M169 510 L149 649 H165 L199 510 M533 510 L548 649 H565 L565 510" fill="#625c4a"/><ellipse cx="362" cy="476" rx="141" ry="34" fill="#f0e6cb"/><path d="M343 427 Q334 404 351 394 Q375 407 364 431" fill="#70966f"/><path d="M359 431 Q361 382 392 370 Q400 412 366 437" fill="#658969"/><path d="M350 441 Q315 405 297 423 Q317 462 352 458" fill="#83a17c"/><path d="M337 460 H383 L374 477 H344Z" fill="#f5f0db"/><path d="M615 167 Q692 91 732 157 Q760 217 713 293" stroke="#688c64" stroke-width="7" fill="none"/><path d="M689 181 Q631 144 626 121 Q699 116 710 165 M708 241 Q760 197 778 217 Q751 265 718 266" fill="#789875" opacity=".8"/><path d="M169 51 L169 0 M518 50 L518 0" stroke="#645f50" stroke-width="5"/><path d="M129 50 Q173 137 217 50Z M476 50 Q516 141 561 50Z" fill="#eadcba"/></svg>'''
(p/'cafe-interior.svg').write_text(interior,encoding='utf-8')
print('assets created',*[x.name for x in p.iterdir()])
