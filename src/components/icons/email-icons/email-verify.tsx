import { IIconProps } from "@/types";
import React from "react";

export const EmailVerifyIcon: React.FC<IIconProps> = (props) => {
    const { color, size } = props;
    return (
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
        >
            <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill={color}
                stroke="none"
            >
                <path
                    d="M2388 4589 c-370 -29 -764 -182 -1073 -418 -84 -64 -266 -242 -338
              -331 -200 -248 -349 -563 -412 -872 -69 -346 -48 -717 61 -1046 65 -198 192
              -435 323 -607 68 -90 245 -268 341 -345 474 -377 1084 -525 1678 -405 293 60
              592 197 837 384 84 64 266 242 338 331 200 247 347 559 411 870 90 437 34 887
             -159 1288 -105 218 -205 361 -375 536 -181 187 -350 309 -581 420 -236 114
             -466 176 -729 196 -148 11 -166 11 -322 -1z m429 -84 c796 -104 1458 -698
             1649 -1480 72 -296 72 -634 0 -930 -191 -782 -852 -1375 -1649 -1480 -1074
            -140 -2060 617 -2202 1693 -141 1064 616 2050 1685 2197 133 18 376 18 517 0z"
                />
                <path
                    d="M1373 3402 c-11 -11 -13 -169 -13 -847 0 -504 4 -836 9 -840 5 -3
              542 -5 1192 -5 943 0 1184 2 1191 12 10 17 10 1659 0 1676 -12 19 -2360 23
              -2379 4z m2241 -70 c-5 -5 -244 -219 -531 -476 l-523 -466 -522 466 c-288 257
              -527 471 -532 476 -6 4 469 8 1054 8 585 0 1060 -4 1054 -8z m-1681 -481 c174
              -156 317 -287 317 -291 0 -4 -143 -135 -317 -291 -175 -156 -357 -319 -405
              -362 l-88 -79 0 732 0 732 88 -79 c48 -43 230 -206 405 -362z m1745 -654 l-3
              -364 -400 358 c-220 196 -400 362 -400 369 0 6 180 173 400 370 l400 357 3
              -363 c1 -200 1 -528 0 -727z m-1221 185 c51 -45 97 -82 103 -82 5 0 47 33 92
              73 45 39 98 86 118 104 l37 32 405 -362 405 -362 -528 -3 c-291 -1 -767 -1
              -1057 0 l-529 3 406 362 405 363 26 -23 c14 -13 67 -60 117 -105z"
                />
            </g>
        </svg>
    );
};
