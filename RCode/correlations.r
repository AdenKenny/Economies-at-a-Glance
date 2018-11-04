remove_outliers <- function(x, na.rm = TRUE, ...) {
  qnt <- quantile(x, probs=c(.25, .75), na.rm = na.rm, ...)
  H <- 1.5 * IQR(x, na.rm = na.rm)
  y <- x
  y[x < (qnt[1] - H)] <- NA
  y[x > (qnt[2] + H)] <- NA
  y
}

raw_xs <- read.csv("./vals.csv", header=FALSE)
raw_ys <- read.csv("./vals2.csv", header=FALSE)

xs = remove_outliers(raw_xs)
ys = remove_outliers(raw_ys)

plot(unlist(ys), unlist(xs), main="Percentage of Workforce in the Services Sector against PPP Per Capita", xlab = "PPP Per Capita (USD)", ylab ="Workforce (%)")
abline(lm(unlist(xs) ~ unlist(ys)))
cor.test(unlist(ys), unlist(xs))