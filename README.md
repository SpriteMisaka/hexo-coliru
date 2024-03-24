# hexo-coliru

A hexo plugin to run code via [coliru](https://coliru.stacked-crooked.com/).

## Installation

```shell
npm install hexo-coliru
```

## Usage

A run button and a result text box will appear in your post via the following method.

````markdown
{% coliru %}

```cpp
#include <iostream>
using namespace std;

int main(void) {
    cout << "Hello!\n";
    return 0;
}
```

{% endcoliru %}
````

