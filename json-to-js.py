# Turns rows of JSON into a javascript variable

# Specify the file paths
datajson = 'data/json/'
datajs = 'data/js/'

files = ['blueprint2015', 'hackq2015', 'whack2015', 'helpq2015']

for filename in files:
    with open(datajson + filename + '.json') as f:
        out = ",\n".join(f.read().split('\n'))
        out = "data_" + filename + " = [" + out + "];"
        with open(datajs + filename + ".js", 'w') as w:
            w.write(out)
