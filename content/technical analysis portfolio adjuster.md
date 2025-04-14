---
tags:
  - freeform
  - documentation
---
this is an old idea for an existing project that is due for a revisit and will probably get one soon
# TODO: Beta calculator
We should find a way to pick stocks that match beta
1. set initial list of stocks to readjust without beta consideration.
2. Look at the magnitude of market returns and pick a target beta that corresponds with that
3. Find the highest and lowest beta-weight stocks
4. Depending on the direction we want to go…
	- remove from the most extreme working against the direction from we want to go from the list of stock options
	- We should save a list of 100 most profitable stocks and pick the next one that fits our criteria
	- Readjust stocks based on projections
	- Rinse and repeat until we get within a *Acceptable range of beta (a hyperparameter)*.
# Thoughts
train TA models on different time periods and see which ones are more successful for a test pool

- **Regression towards the mean**
	- Investing in stable companies when their valuation is “[[below the line]]”
- **High-value bets on undervalued stocks**
	- Investing in undervalued tesla right before a huge announcement
- Don’t go more than 50% on a high value bet
- Learn quantitative analysis
- Invest in commodities that have in demand use by new technologies (LK-99 superconductor)

### Important considerations
- Volatility of the investment (Shoot for low $\beta$ *especially* during downturns)
- Type of investment
- The news cycle
- Health of the economy (recession = High value bets!)

```
MONTHS_RESERVED = 3

expected_fixed_expenses = getFixedExpenses()

variable_expenses_allowance = getVariableExpenses()

required_reserve_balance = MONTHS_RESERVED * (expected_fixed_expenses + variable_expenses_allowance)
```

**Current Fixed Expenses**: must be within $100 of a number defined as `(expected_fixed_expenses + variable_expenses_allowance)`
**Prepaid Fixed Expenses**: must be within range from $100 to `(MONTHS_RESERVED - 1) * (expected_fixed_expenses + variable_expenses_allowance)`
**Variable Expenses Allowance**: must be within range from $100 to a user defined maximum
**Emergency Fund / Investment Pool**: This is where ALL deposits should go! must be within $100 of a number defined as `required_reserve_balance - fixed_expenses`
**Reserve**: Is an extension of Emergency Fund / Investment Pool. It must be within range from $0 to

```
getFixedExpenses():
	[(rent, 750)
	 (electricity, 70)
	 (water, 40)
	 (internet, 5)
	 (phone, 20)
	 (spotify, 4)
	 (google workspace, 18)
	 (student loans, 150)]
	
	 total = arr[1] // (lets say 1050)
```

How are algorithms determined?
We create an average line that is calculated by points at the past 2000 day averages, where days 0-2, 2-7, 7-31, 31-92, 92-365, and 365+ are weighted by an exponential decay function where roughly 1/5th the weight of each stock is measured

We also need a view that shows expected 2-day, week, month, quarterly, yearly, and 4-yearly changes in value

Future: Fundamental Analysis: Statements

You invest in riskier investments when you are young so you can pull out over a longer timeframe
Risk: HOW LONG will it be bad? How long will you have to wait?
### Line one: The magic curve (for finding current trend)
good at detecting sudden falls

Inspired by the GOLDEN CROSS

Zipf curve

We need to come up with an equation such that 
$\int_{0}^{7}3f\left(x\right)dx \approx \int_{7}^{365}f\left(x\right)dx \approx \int_{365}^{\infty}3f\left(x\right)dx$

This is is a complex nonlinear problem that will consider an “average” line for a stock price based on $\frac{1}{5}$ the average of the first week, $\frac{3}{5}$ the average of the first year (excluding the first week), and $\frac{1}{5}$ the average of everything after one year.

We could also come up with another equation such that
$\int_{0}^{2 \text{ or } 3}4f\left(x\right)dx \approx \int_{7}^{365}f\left(x\right)dx \approx \int_{365}^{\infty}4f\left(x\right)dx$

This equation is a bit more specific about the initial number of days, and compensates by breaking the ranges of days averaged into more refined “chunks”

Either way, we need an equation and a coefficient. A exponential decay function won’t work, because it weighs to heavily $\int_{7}^{365}f\left(x\right)dx$. See 
```embed
title: "Technical Analysis Predictor"
image: "https://www.desmos.com/calc_thumbs/production/wcqzpxjkit.png"
description: "Explore math with our beautiful, free online graphing calculator. Graph functions, plot points, visualize algebraic equations, add sliders, animate graphs, and more."
url: "https://www.desmos.com/calculator/wcqzpxjkit"
```

### Considerations
Stock deviation (goes up and down in dramatic sweeps (tech stocks))
Stock erraticism (goes all over the place frequently)
Stock current trend (slope of recent trendline)
Stock stable average(s)
Stock Market cap
### 10 trend cases to meet for risk charts
- Slow rise high value (pull out slowly)
- Slow rise low value (go in)
- fast rise high value
- fast rise low value
- stagnant high value (pull out)
- stagnant low value (go in slowly)
- slow fall high value ()
- slow fall low value (pull ou)
- fast fall high value
- fast fall low value

Stocks have very high Entropy: ![[Screenshot 2024-01-11 at 1.03.39 PM.png]]

$Risk\_Factor = Predicted\_Value / Expected\_Variance$ or $Risk\_Factor = -Predicted\_Value * drop_potential$

Could we use KL divergence to find a “perfect chart”, then backplot our way to a direction
### Advice from a reddit post:
I'll bite.

Years ago, before I was a trader, I was a professional poker player.

Poker, like trading, isn't a complicated game: bet good hands, fold bad ones, repeat. Here's the truest quote I know about the difference between amateur poker players and professionals:

> An average player can play solid poker for an hour.
> 
> A good player can play solid poker for two hours.
> 
> A professional can play solid poker for three hours.

In addition to emotional control, there's "one weird trick": risk management. A professional poker player takes the small edges and ekes them out over time. A statistically significant sample for an online professional poker player is ~50,000 hands. Pros refer to themselves as "grinders" as they wield their tiny edges from hand to hand. If you go broke, you can't win with your tiny edge. Risk management keeps you in the game.

Trading is similar to poker. To quote billionaire trader Paul Tudor Jones:

> 90% of a trader's job is risk control.

_**Technical analysis doesn't predict the future. Technical analysis identifies and quantifies risk.**_

That's why [most TA looks like nonsense](https://www.tradingview.com/u/MagicPoopCannon/): people are using hammers for brain surgery and wondering why the patient keeps dying.

There's less risk when you use TA as it's supposed to be used:

- bet with the long-term trend (EMA's, trendlines, chart patterns)
    
- enter with price momentum, not against it (oscillators)
    
- use stops (trailing, volatility, structural, OCO's, limit, market)
    
- only risk 1% of capital on any one trade (flat, pyramiding, spreading risk across markets and trades)
    
- use smaller positions in high volatility (ATR, Bollinger Bands)
    

But, there's a problem.

> Good trading should be a little bit boring. - George Soros

Good trading is _unsexy as fuck_. That's why good trading doesn't catch on. It's the eating your vegetables of the financial world.

For example, today was a good day for me. I made ~6%. Professional trading is [nothing like this r/wsb post](https://www.reddit.com/r/wallstreetbets/comments/b9v2q5/aapl/) where he made 50% in a week. However, that dude and the rest of [r/wsb](https://www.reddit.com/r/wsb/) will be broke "eventually" and I'll keep on truckin'.

Here are stats from my last 100 trades (an unspectacular sample across 20 markets in crypto/stocks/forex):

- Win/loss: 44-58 (43%)
    
- %/trade: 0.07
    
- %/win: 1.01
    
- %/loss: -0.64
    
- %: 6.98
    

Notice the win rate? Sub-50%. But my winners are bigger than my losers which allows me to make money. Typical trend-following system. It's common for professional traders to have below 50% win rates. I repeat: Technical Analysis is used to limit risk, not predict the future!

_Without risk management, Technical Analysis is useless_. Here's a [free PDF of the turtle trader system](https://bigpicture.typepad.com/comments/files/turtlerules.pdf). It's a great introduction to how professionals trade and how you should think about TA.

[Here's a great trend-following system](https://tradingstrategyguides.com/big-three-trading-strategy/) that's simple to learn. I programmed it to work with TradingView ([code here](https://pastebin.com/HeJC2fMe)). It'll work across all markets: crypto, stocks, forex, etc. (It looks better with bars rather than candles.)

The 3 EMA's are an elegant design:

1. The long EMA acts as a trend indicator. Which way to bet?
    
2. The medium EMA paired with the long term EMA acts as an oscillator. Is price accelerating in our favor?
    
3. The short EMA acts as a volatility filter. Gray = sideways movement and neither long nor short would make money, so stay away.
    

I use this system on the 1H charts. It's enough to make a trade every few days on each market, and I follow ~20 markets. You can use it on any time frame.

Your position size should be: (Account Size * 1%) / (2 * Average True Range / Entry Price). For example, for an account with $10,000 trading TQQQ at the end of today on the 1H charts: (10,000 * 0.01) / (2 * 0.65 / 61.39) = $4,722. Divide that by the share price (61.39) = 77 shares. This is described in the turtle trader PDF as "N".

(Note: you may adjust the ATR to fit your risk tolerance, 2 works best in my experience. Your stop distance in this case is 2* ATR = $1.30. Your stop being hit will lose 1% of the account.)

Expect to win ~40% of your trades with this system. Many will be small winners and small losers (1-2%). A few will be big winners (5%+). That's professional trading. Boring.

----------------------------------------------------------------------------------------------

I typed this up to see if I could make a clear, concise, and convincing argument for TA. I can't. Real trading takes work. I fill out my orders, spreadsheets, and watch my risk levels all day just to knock out a percent or two. While I wait for my trades to move, I read [r/wallstreetbets](https://www.reddit.com/r/wallstreetbets/) to wonder "What if I just ignored all my risk control? ... Oh yeah, I'd be broke."
### We should build a cyclical model of the economy…
1 Basic Materials  
2 *Communication Services*  
3 Consumer Discretionary (aka consumer cyclical)  
4 Consumer Staples (aka consumer defensive)  
5 Energy  
6 *Financial*  
7 Healthcare  
8 Industrials  
9 *Real Estate*  
10 Technology  
11 Utilities  


However, the decrease in portfolio standard deviation (i.e. the  
benefit of adding additional stocks) gets smaller beyond 30  
stocks
### Consumer Cyclical (requires predicting cycles in the first place)
1. **Consumer Discretionary:** Highly sensitive to economic cycles. In boom times, people spend more on non-essential items, but cut back during downturns.
2. **Industrials:** Closely tied to economic activity. High demand during growth periods but declines during recessions.
3. **Materials:** Demand for basic materials fluctuates with industrial activity and construction, which are cyclical.
4. **Energy:** Often cyclical, influenced by global economic conditions and geopolitical events affecting oil and gas prices.
### Consumer Defensive (straight line)
1. **Consumer Staples:** Demand remains relatively stable as these are essential goods like food and hygiene products.
2. **Utilities:** Provide essential services like water, gas, and electricity, which remain in constant demand regardless of the economy.
3. **Healthcare:** Relatively immune to economic cycles. Healthcare services and products are essential and demand is consistent.
4. **Technology:** It can be mixed, but certain segments like software and services can be less cyclical compared to hardware and consumer electronics.

### Algorithmic trading
- Momentum trading
- Quantinsti
- Finviz?
	- Build a model that takes in all financial statements from Finviz as input params for each stock on training corpus?
- Quantopedia
- Jim Simons
- Essential Limit Theorem “Miracle of pricing”

Book: A random walk down wallstreet
# The Valuation Model
>Risk management keeps you in the game.
>Risk is: HOW LONG will it be bad? How long will you have to wait?

This would be a snapshot of the parameters of one stock, during one day. This would be repeated for the entire duration of `N`.
`N` = window of investment –AKA: risk. `N` of one year would only look at stocks over that timeframe. We’d likely want an `N` of 5 for medium risk investments![[Screenshot 2024-05-20 at 9.28.43 AM.png]]
![[Screenshot 2024-05-19 at 6.48.05 PM.png]]
```python
[
	### economic conditions
	interest_rate = 0.032
	inflation_rate = 0.041
	day_of_year = 13  # January 13th
	100q = 35%
	99q = 25%
	75q = 5%
	50q = -3%
	25q = -32%
	1q = -66%
	[pandemic, war, recession]
	
	market_volitility

	### geopolitical conditions
	western_progressivism = 0.76 # us, canada, west europe, australia, japan, south korea
	western_stability = 0.54
	east_bloc # china, russia, iran, north korea
	latin
	middle_east
	sub_saharan_africa
	india
	south_east_asia
],
Covariance_against_each_sector?
Capital structure?
Closing returns
share issuation
[
	### technical analysis parameters
	valuation = 53.00
	trading_volume = ?
	market_liquidity = ?
	price_volitility = ?
	beta
	put_call_ratio = 2.067
	three_day_average = 55.00
	weekly_time_average = 49.00
	monthly_average = 47.00
	quarterly_average = 48.00
	yearly_average = 50.00 # only if N is greater than 1 year
	day_of_week = 'monday' 
	N_time_average = 39.00  # only if N is greater than 5 years
	stock_type = 1  # basic materials
	beta = ? # a part of stock_type?
	etf = False

	### financial statement parameters
	debt_to_equity: 0.90
	EPS
	p_e_ratio

	### analyst ratings
	buy: 44
	sell: 30
	hold: 12

	### discourse (NLP focused probabilities)
	twitter_buzz = 0.75  # tweets per day, relative to average tpd for the past weklek
	twitter_sentiment = 0.8673  # positive sentiment analysis
	key_word_buzz = 0.94
	# ['electric car': 130, 'renewable energy': 50]
	# might look at past sentiments and make a judgement on that window in comparison
]
```
We would also want the parameters of other stocks to affect the stocks we choose. The parameters of TSLA should have an impact on the parameters of WLMT, AMZN, and so on.

We would also want to intentionally omit the following parameters
- `date`; we will be training stocks together in the same date window, but we don’t want the date itself to actually affect how the model learns stock patterns
- `dividends`; we would actually want to measure this in the Distribution Model, since they are paid out and we can use the payout to weigh into our investment distribution
- `is_etf`; we will be tracking this in distribution model
### Loss function
Should represent the difference between the `valuation` and the immediate future’s `N_time_average`. This number should represent two readjustment periods, (since we are readjusting every two weeks, this is every two months

This itself should have *two to `N`* versions: **We should have models that penalize underestimates and losses with greater weight curves**
- 1-2 positively linear losses (rewarding gains)
- 1-2 negatively linear losses (punishing losses)
- 1-2 positively exponential losses (rewarding gains)
- 1-2 negatively exponential losses (losses gains)
- 1 flat valuation
### Datasets
Since the most recent data is the hardest to track but also the most relevant, we want to slightly overrepresent data that is more recent and work our way back to less representation as time is less recent

Datasets should be chosen in `N`-time averages
### Choosing and updating batches
Since the most recent data is the hardest to track but also the most relevant, we want to slightly overrepresent data that is more recent and work our way back to less representation as time is less recent
# The Distribution Model
When actually investing money into stocks, investments should shuffle between stocks proportionally the minimum stock having $0 and the maximum stock having the most invested in it, with all the stocks in between getting an exponentially distributed share. Another model should be ran to actually come up with the ideal distribution for the stocks. It should take in data from *two to n* valuation models with different loss-functions applied to them as parameters, then adjust them to find the best fitted distribution.

This should be blind to the stocks itself, and should instead adjust it’s behavior based on the following metrics:

**Most importantly, we want to use MULTIPLE distribution models across different training sets to deduce a crude prediction of risk**
TODO: the reward for the valuation model should vary based on the loss
TODO: should also consider that taxes are capital gains if invested for > 1 year, and income tax if invested for < 1 year. Captical gains taxes are cheaper!
```python
[
	### economic conditions (as before)
	interest_rate = 0.032
	inflation_rate = 0.041
	day_of_year = 13  # January 13th
	market_volitility
]
[
	 ### economic conditions
	interest_rate = 0.032
	inflation_rate = 0.041 # we can use this to track real profit earnings!
	day_of_year = 13  # January 13th

	### individual stocks
	taxable = True # we deduct taxable from prediction
	fee = 0.025 # we deduct fee percentage from prediction
	dividends = 15 # we add dividends to prediction
	valuation = 45
]
```
# The User-facing Application
User input should be able to decide on how much investible capital they would like to keep track of (eg. low risk: 25%, med risk: 30%, high risk 30%, very high risk: 15%). Physical asset adjustments should only be considered when asset price drops or raises beyond a user defined range

User should also be able to manually input changes to months of emergency fund, physical assets, and define “purpose” for all account subclasses. Mandatory special purposes should also be defined here, denoted by `**`

Connects directly to Alpaca

```
Welcome
-------

Net Worth:                              $9800
Required 3 Month Emergency Fund:        $2700
Total Invested Capital:                 $4300

Time since last adjustment:             14 days ago
Interest accrued since last adjustment: $45
ROI:
Interest accrued in the last 30 days:   $120
Interest accrued in the last 365 days:  $2800
Interest accrued all time:              $5080

Would you like to check portfolio performance? (y/n)
n

Bank Accounts | Cash  | Status | Adjust To | Purpose
-----------------------------------------------------    
--Checking    | 400   | OK     | 0         | **Monthly Expenses Allowance
--Savings     | 3000  | HIGH   | -500      | **Primary EF Account

Fixed Assets     | Algorithm | Qty | Value | Status | Adjust To
----------------------------------------------------------------
--Gold (1oz)     | Med Risk  | 0   | 0     | LOW    | +100
--Silver (1oz)   | Med Risk  | 17  | 420   | HI     | -10
--Platinum (1oz) | Med Risk  | 0   |       | LOW    | +400
--Paladium (1oz) | Med Risk  | 0   |       | LOW    | +300


Do you intend to buy more fixed assets? (y/n)
n
Do you intend to sell more fixed assets? (y/n)
y
What would you like to sell?
Silver (1oz)
How many Silver (1oz) would you like to sell?
1


Fixed Assets     | Algorithm | Qty     | Value | Status | Adjust To
--------------------------------------------------------------------
--Gold (1oz)     | Med Risk  | 0       | 0     | LOW    | +100
--Silver (1oz)   | Med Risk  | 16      | 401   | LOW    | +9
--Platinum (1oz) | Med Risk  | 0       |       | LOW    | +400
--Paladium (1oz) | Med Risk  | 0       |       | LOW    | +300


Do you intend to buy more fixed assets? (y/n)
n
Do you intend to sell more fixed assets? (y/n)
n


Assets       | Algorithm | Tracking | Value | Status | Adjust To
-----------------------------------------------------------------
Bonds
--TLT (ETF)  | Btm Risk  | T        | 300     | OK     | -50
--MUB (ETF)  | Btm Risk  | T        | 500     | OK     | +30
Consumer Staples
--XLP (ETF)  | High Bull | T        | 0     | OK     | 0
--VDC (ETF)  | High Bull | T        | 0     | OK     | 0
--PG         | High Bear | T        | 0     | OK     | 0
--WLMT       | High Bear | T        | 0     | OK     | 0
--KO         | High Bear | T        | 0     | OK     | 0
Utilities
--NEE (ETF)  | Low Risk  | T        | 0     | OK     | 0
--DUK (ETF)  | Low Risk  | T        | 0     | OK     | 0
--XLU        | Low Risk  | T        | 0     | OK     | 0
--VPU        | Low Risk  | T        | 0     | OK     | 0
Cryptocurrency
--GDLC (ETF) | Top Risk  | T        | 0     | OK     | 0
--BITW (ETF) | Top Risk  | T        | 0     | OK     | 0
--Bitcoin    | Top Risk  | T        | 0     | OK     | 0
--Ethereum   | Top Risk  | T        | 0     | OK     | 0
--Monero     | Top Risk  | FALSE    | 400   | LOW    | +40
Broad ETFs
--SPY (ETF)  | Med Risk  | T        | 0     | OK     | 0
--VTI (ETF)  | Med Risk  | T        | 0     | OK     | 0
REITs
--VNQ (ETF)  | Med Risk  | T        | 0     | OK     | 0
--IYR (ETF)  | Med Risk  | T        | 0     | OK     | 0
--AMT        | Med Risk  | T        | 0     | OK     | 0
--PLD        | Med Risk  | T        | 0     | OK     | 0
Tech
--XLK (ETF)  | High Risk | T        | 0     | OK     | 0
--TESLA      | High Risk | T        | 0     | OK     | 0
--NVDA       | High Risk | T        | 0     | OK     | 0
--PLTR       | High Risk | T        | 0     | OK     | 0


Would you like to liquidate investment capital? (y/n)
n
Would you like to continue with the perscribed adjustments? (y/n)
y
Remember to manually adjust the following untracked assets:
--Monero +40


Order (1/26) SELL TLT (ETF) Complete...
Order (2/26) BUY  XLK (ETF) Complete...
...


All adjustments completed!
```
# Datastore updater
# Future Steps
### Valuation Model
1. `N`-batch TSLA train with base features
	- technical analysis
2. `N`-batch TSLA + BP train
3. two-`N`-batch TSLA train
4. two-`N`-batch TSLA + BP train
5. two-`N`-batch TSLA + BP train with expanded features
	- financial statement parameters, analyst ratings, discourse
6. `N`-batch EVs and Oil stocks train
7. `N`-batch EVs and Oil stocks train + test
8. two-`N` batch EVs and Oil stocks train + test
9. multi-`N` batch EVs and Oil stocks train + test
10. multi-`N` batch (exponentially distributed) grab bag stocks (weighted by market cap) train + test
### Distribution Model
1. gradient model distribution
2. exponential model distribution
3. gradient + exponential distribution
### Application
1. **Connection to Llama**
2. Implementation
3. Updating
---
- **Comparative WACC Analysis:**
    
    - **Objective:** Compare a company's WACC to its peers or industry average.
    - **Relevance:** A lower WACC compared to competitors can indicate a competitive advantage in raising capital and potentially lower financial risk, making it a more attractive investment.
- **Trend Analysis of WACC Over Time:**
    
    - **Objective:** Analyze the trend of a company's WACC over multiple periods.
    - **Relevance:** A decreasing WACC over time suggests improved financial health and a reduction in perceived risk by investors, whereas an increasing WACC may indicate rising risk or inefficiency.
- **Return on Invested Capital (ROIC) vs. WACC:**
    
    - **Objective:** Compare the company's ROIC with its WACC.
    - **Relevance:** If ROIC consistently exceeds WACC, the company is generating value over its cost of capital, indicating efficient use of capital and potentially higher stock valuation.
- **Impact of Debt Levels on WACC:**
    
    - **Objective:** Assess how changes in the company's debt levels impact its WACC.
    - **Relevance:** Understanding the optimal capital structure that minimizes WACC can highlight a company's strategic financial management, influencing its investment attractiveness.
- **WACC and Stock Valuation Models:**
    
    - **Objective:** Use WACC in Discounted Cash Flow (DCF) models to value the company's stock.
    - **Relevance:** Accurate valuation models incorporating WACC help investors determine if the stock is overvalued or undervalued based on future cash flow projections.
- **Sensitivity Analysis of WACC Components:**
    
    - **Objective:** Perform sensitivity analysis on components of WACC (cost of equity, cost of debt, tax rate).
    - **Relevance:** Understanding how sensitive WACC is to changes in market conditions or internal factors provides insights into potential risks and the robustness of the company's capital strategy.
- **Evaluation of Growth Opportunities:**
    
    - **Objective:** Assess potential growth projects using WACC as the discount rate.
    - **Relevance:** Projects that generate returns above the WACC are expected to create shareholder value, which is crucial for long-term stock performance.
- **Impact of Market Conditions on WACC:**
    
    - **Objective:** Analyze how external market conditions (interest rates, economic cycles) affect WACC.
    - **Relevance:** External factors impacting WACC provide a broader context of the investment environment, helping investors make informed decisions.
    ![[Screenshot 2024-05-26 at 11.11.38 PM.png]]