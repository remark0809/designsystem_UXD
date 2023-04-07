// チェックボックスの取得
const btn = document.querySelector("#btn-mode");

// チェックした時の挙動
btn.addEventListener("change", () => {
  if (btn.checked == true) {
    // ダークモード
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
  } else {
    // ライトモード
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  }
});


// 获取所有的输入控件和提交按钮
const baseColorInput = document.getElementById('base-color');
const numColorsInput = document.getElementById('num-colors');
const lightnessDecLeftInput = document.getElementById('lightness-dec-left');
const saturationIncLeftInput = document.getElementById('saturation-inc-left');
const saturationDecLeftInput = document.getElementById('saturation-dec-left');
const lightnessIncRightInput = document.getElementById('lightness-inc-right');
const lightnessDecRightInput = document.getElementById('lightness-dec-right');
const saturationIncRightInput = document.getElementById('saturation-inc-right');
const saturationDecRightInput = document.getElementById('saturation-dec-right');
const generateBtn = document.getElementById('generate-btn');
const colorPalette = document.getElementById('color-palette');

const lightHueRange = document.getElementById("light-hue-range");
const darkHueRange = document.getElementById("dark-hue-range");





// 当用户调整了滑块时更新显示数值的元素
function updateValueDisplay(input, output) {
	output.textContent = input.value;
}


lightnessDecLeftInput.addEventListener('input', function() {
	updateValueDisplay(lightnessDecLeftInput, document.getElementById('lightness-dec-left-value'));
});

saturationIncLeftInput.addEventListener('input', function() {
	updateValueDisplay(saturationIncLeftInput, document.getElementById('saturation-inc-left-value'));
});

saturationIncLeftInput.addEventListener('input', function() {
	updateValueDisplay(saturationIncLeftInput, document.getElementById('saturation-inc-left-value'));
});


lightnessIncRightInput.addEventListener('input', function() {
	updateValueDisplay(lightnessIncRightInput, document.getElementById('lightness-inc-right-value'));
});

lightHueRange.addEventListener('input', function() {
	updateValueDisplay(lightHueRange, document.getElementById('light-hue-range-value'));
});

darkHueRange.addEventListener('input', function() {
	updateValueDisplay(darkHueRange, document.getElementById('dark-hue-range-value'));
});


saturationDecRightInput.addEventListener('input', function() {
	updateValueDisplay(saturationDecRightInput, document.getElementById('saturation-dec-right-value'));
});

// 当用户点击提交按钮时生成颜色调色板
generateBtn.addEventListener('click', function() {
// 获取所有用户的输入值
const baseColor = baseColorInput.value;
const numColors = numColorsInput.valueAsNumber;
const lightnessDecLeft = lightnessDecLeftInput.valueAsNumber;
const saturationIncLeft = saturationIncLeftInput.valueAsNumber;
const lightnessIncRight = lightnessIncRightInput.valueAsNumber;
const saturationDecRight = saturationDecRightInput.valueAsNumber;
const lightHue = lightHueRange.valueAsNumber;
const darkHue = darkHueRange.valueAsNumber;

// 清空之前的调色板
colorPalette.innerHTML = '';

// 计算每个颜色的HSB值
const baseColorHSB = tinycolor(baseColor).toHsv();
const step = numColors - 1;
for (let i = 0; i < numColors; i++) {
	// 计算颜色的亮度和饱和度
	let lightness = baseColorHSB.v;
	let saturation = baseColorHSB.s;
	let hue = baseColorHSB.h;

	if (i === 0) {
		// 将第1个颜色变成左边数过来第4个颜色
		lightness = Math.max(baseColorHSB.v - (1 + 3)*lightnessDecLeft, 0);
		saturation = Math.min(baseColorHSB.s + (1 + 3)*saturationIncLeft, 1);
		hue = baseColorHSB.h - (1 + 3) * (darkHue);
	  } else if (i === 1) {
		// 第2个颜色保持不变
		lightness = Math.max(baseColorHSB.v - (1 + 2)*lightnessDecLeft, 0);
		saturation = Math.min(baseColorHSB.s + (1 + 2)*saturationIncLeft, 1);
		hue = baseColorHSB.h - (1 + 2) * (darkHue);
	  } else if (i === 2) {
		// 将第3个颜色变成左边数过来第1个颜色
		lightness = Math.max(baseColorHSB.v - (1 + 1)*lightnessDecLeft, 0);
		saturation = Math.min(baseColorHSB.s + (1 + 1)*saturationIncLeft, 1);
		hue = baseColorHSB.h - (1 + 1) * (darkHue);
	  }else if (i === 3) {
		// 将第4个颜色变成左边数过来第1个颜色
		lightness = Math.max(baseColorHSB.v - (1 + 0)*lightnessDecLeft, 0);
		saturation = Math.min(baseColorHSB.s + (1 + 0)*saturationIncLeft, 1);
		hue = baseColorHSB.h - (1 + 0) * (darkHue);
	  }
	  else if (i > 4) {
		// 将后三个颜色变亮
		lightness = Math.min(baseColorHSB.v + (i - 3)*lightnessIncRight , 1);
		saturation = Math.max(baseColorHSB.s - (i - 3)*saturationDecRight, 0);
		hue = baseColorHSB.h + (i - 3) * (lightHue);
	} else {
		// 第四个颜色是基础颜色
		lightness = baseColorHSB.v;
		saturation = baseColorHSB.s;
	}

	// 创建一个颜色框并添加到调色板中
	const color = tinycolor({ h: hue, s: saturation, v: lightness });
	const colorBox = document.createElement('div');
	colorBox.className = 'color-box';
	colorBox.style.backgroundColor = color.toHexString();
	colorBox.setAttribute('data-hex', color.toHexString()); // 设置data-hex属性
	colorPalette.appendChild(colorBox);

	const colorBoxes = document.querySelectorAll('.color-box');

// 遍历所有颜色方块
colorBoxes.forEach((box) => {
  box.addEventListener('click', (event) => {
    const hexCode = box.getAttribute('data-hex');

    // 检查是否单击的是颜色方块本身
    if (event.target === box) {
      // 将颜色方块的 HEX 代码复制到剪贴板中
      navigator.clipboard.writeText(hexCode);

      // 显示反馈消息
      const toast = document.createElement('div');
      toast.classList.add('toast');
      toast.textContent = 'Copied to clipboard!';
      document.body.appendChild(toast);

      // 添加渐入效果
      setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, 0)';
      }, 100);

      // 添加渐出效果
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, 20px)';
        setTimeout(() => {
          toast.remove();
        }, 300);
      }, 750);
    }
  });
});

function updateColorBoxes() {
	// ...
  
	// 添加鼠标悬停事件处理程序，以实现漂移阴影效果
	colorBoxes.forEach((box) => {
	  box.addEventListener('mouseover', () => {
		box.classList.add('color-box-hover');
	  });
  
	  box.addEventListener('mouseout', () => {
		box.classList.remove('color-box-hover');
	  });
  
	  box.addEventListener('click', () => {
		// 复制到剪贴板
		const hexCode = box.getAttribute('data-hex');
		navigator.clipboard.writeText(hexCode);
  
		// 显示 toast
		const toast = document.createElement('div');
		toast.classList.add('toast');
		toast.textContent = 'Copied to clipboard!';
		document.body.appendChild(toast);
  
		setTimeout(() => {
		  toast.classList.add('hide');
		}, 1500);
  
		setTimeout(() => {
		  document.body.removeChild(toast);
		}, 2000);
	  });
	});
  }


  //输出到控制台
console.log(hue);
	
}
});


