(function(imageproc) {
    "use strict";

    /*
     * Apply a Gaussian filter to the input data
     */
    imageproc.gaussianBlur = function(inputData, outputData, size) {
        /* Calculate the sigma value */
        var sigma = size/4;
        console.log("sigma" + sigma);

        /* Make the row/column matrix */
        var rowMatrix = [];
        var radius = Math.floor(size / 2);
        //var firstValue = Math.exp(-(radius * radius)/2) / (sigma * Math.sqrt(2*Math.PI));
        console.log("Value" +radius);
        for(var i = 0;i < size;i++){
            var dis = (i - radius);
            rowMatrix[i] = 
            Math.exp(-(dis * dis)/(2*sigma*sigma)) / (sigma * Math.sqrt(2*Math.PI));
            //rowMatrix[-i] = 
            //Math.floor(Math.exp(-(i*i)/2) / (sigma * Math.sqrt(2*Math.PI) * firstValue));
            

        }

        /* Create the kernel */
        var kernel = [];
        /*
            [1, 2, 1],
            [2, 5, 2],
            [1, 2, 1]
        ];*/

        var divisor = 0;//17;//4+9+4
        for(var i = 0;i < size; i++)
        {
            kernel[i] = [];
            for(var j = 0;j < size;j++)
            {
                kernel[i][j] = rowMatrix[i] * rowMatrix[j];
                //kernel[i][j] = Math.floor(kernel[i][j]/(rowMatrix[0] * rowMatrix[0]));
                divisor += kernel[i][j];
            }
        }
        /***** DO NOT REMOVE - for marking *****/
        var line = "";
        console.log("Row matrix:");
        for (var i = 0; i < size; i++)
            line += rowMatrix[i] + " ";
        console.log(line);

        console.log("Kernel:");
        for (var j = 0; j < size; j++) {
            line = "";
            for (var i = 0; i < size; i++) {
                line += kernel[j][i] + " ";
            }
            console.log(line);
        }
        console.log("Divisor: " + divisor);
        /***** DO NOT REMOVE - for marking *****/

        var halfSize = Math.floor(size / 2);

        /* Apply the gaussian filter */
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                var sumR = 0, sumG = 0, sumB = 0;

                /* Sum the product of the kernel on the pixels */
                for (var j = -halfSize; j <= halfSize; j++) {
                    for (var i = -halfSize; i <= halfSize; i++) {
                        var pixel =
                            imageproc.getPixel(inputData, x + i, y + j);
                        var coeff = kernel[j + halfSize][i + halfSize];

                        sumR += pixel.r * coeff;
                        sumG += pixel.g * coeff;
                        sumB += pixel.b * coeff;
                    }
                }

                /* Set the averaged pixel to the output data */
                var i = (x + y * outputData.width) * 4;
                outputData.data[i]     = sumR / divisor;
                outputData.data[i + 1] = sumG / divisor;
                outputData.data[i + 2] = sumB / divisor;
            }
        }
    }
 
}(window.imageproc = window.imageproc || {}));
